import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TrainingPhase } from '@muni-kypo-crp/training-model';
import { noop, Observable, of } from 'rxjs';
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { delay, take } from 'rxjs/operators';
import { AdaptiveRunTrainingPhaseService } from './../../../services/adaptive-run/training-phase/adaptive-run-training-phase.service';
import { AdaptiveRunTrainingPhaseConcreteService } from '../../../services/adaptive-run/training-phase/adaptive-run-training-phase-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-training-phase',
  templateUrl: './training-phase.component.html',
  styleUrls: ['./training-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AdaptiveRunTrainingPhaseService, useClass: AdaptiveRunTrainingPhaseConcreteService }],
})
export class TrainingPhaseComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() phase: TrainingPhase;
  @Input() isLast: boolean;
  @Input() isPhaseAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('topology') topology: ElementRef<HTMLDivElement>;

  topologyWidth: number;
  topologyHeight: number;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  displayedSolutionContent$: Observable<string>;
  destroyRef = inject(DestroyRef);

  constructor(
    private trainingPhaseService: AdaptiveRunTrainingPhaseService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
  }

  ngOnInit(): void {
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('phase' in changes) {
      this.calculateTopologySize();
      this.trainingPhaseService.init(this.phase, this.isPhaseAnswered);
      this.isCorrectAnswerSubmitted$ = this.trainingPhaseService.isCorrectAnswerSubmitted$;
      this.isSolutionRevealed$ = this.trainingPhaseService.isSolutionRevealed$;
      this.isLoading$ = this.trainingPhaseService.isLoading$;
      this.displayedSolutionContent$ = this.trainingPhaseService.displayedSolutionContent$;
    }
  }

  ngAfterViewInit(): void {
    this.calculateTopologySize();
  }

  onNext(): void {
    this.next.emit();
  }

  revealSolution(): void {
    this.trainingPhaseService
      .revealSolution()
      .pipe(take(1), delay(50))
      .subscribe(() => this.scrollToBottom());
  }

  onAnswerSubmitted(answer: string): void {
    this.trainingPhaseService.submitAnswer(answer).pipe(take(1)).subscribe();
  }

  download(): void {
    this.trainingPhaseService.getAccessFile().pipe(take(1)).subscribe();
  }

  private calculateTopologySize() {
    if (!this.topology) {
      return;
    }
    this.topologyWidth = this.topology.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topology.nativeElement.getBoundingClientRect().height + 32;
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }

  private scrollToBottom(): void {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  protected readonly of = of;
  protected readonly noop = noop;
}
