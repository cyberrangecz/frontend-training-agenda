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
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { Observable } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { HintButton } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { Hint, TrainingLevel } from '@muni-kypo-crp/training-model';
import { TrainingRunTrainingLevelService } from './../../../services/training-run/level/training/training-run-training-level.service';
import { TrainingRunTrainingLevelConcreteService } from './../../../services/training-run/level/training/training-run-training-level-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-training-level',
  templateUrl: './training-level.component.html',
  styleUrls: ['./training-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TrainingRunTrainingLevelService, useClass: TrainingRunTrainingLevelConcreteService }],
})
/**
 * Component of a training level in a training run. Users needs to find out correct solution (answer) and submit it
 * before he can continue to the next level. User can optionally take hints.
 */
export class TrainingLevelComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() level: TrainingLevel;
  @Input() isLast: boolean;
  @Input() isLevelAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('controlsContainer', { static: false, read: ElementRef }) controlsContainer: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  displayedHintsContent$: Observable<string>;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hintsButtons$: Observable<HintButton[]>;
  displayedSolutionContent$: Observable<string>;
  destroyRef = inject(DestroyRef);

  constructor(
    private trainingLevelService: TrainingRunTrainingLevelService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
  }

  ngOnInit(): void {
    this.initTopology();
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.initTopology();
      this.trainingLevelService.init(this.level, this.isLevelAnswered);
      this.displayedHintsContent$ = this.trainingLevelService.displayedHintsContent$;
      this.isCorrectAnswerSubmitted$ = this.trainingLevelService.isCorrectAnswerSubmitted$;
      this.isSolutionRevealed$ = this.trainingLevelService.isSolutionRevealed$;
      this.isLoading$ = this.trainingLevelService.isLoading$;
      this.hintsButtons$ = this.trainingLevelService.hints$;
      this.displayedSolutionContent$ = this.trainingLevelService.displayedSolutionContent$;
    }
  }

  ngAfterViewInit(): void {
    this.calculateTopologySize();
  }

  onAnswerSubmitted(answer: string): void {
    this.trainingLevelService.submitAnswer(answer).pipe(take(1)).subscribe();
  }

  onNext(): void {
    this.next.emit();
  }

  /**
   * Calls service to download ssh access for user
   */
  download(): void {
    this.trainingLevelService.getAccessFile().pipe(take(1)).subscribe();
  }

  /**
   * Calls service to reveal hint
   * @param hint hint revealed by the user
   */
  revealHint(hint: Hint): void {
    this.trainingLevelService
      .revealHint(hint)
      .pipe(take(1), delay(50))
      .subscribe(() => this.scrollToBottom());
  }

  /**
   * Calls service to reveal solution
   */
  revealSolution(): void {
    this.trainingLevelService
      .revealSolution(this.level)
      .pipe(take(1), delay(50))
      .subscribe(() => this.scrollToBottom());
  }

  private scrollToBottom(): void {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  private initTopology() {
    this.isTopologyDisplayed =
      (this.sandboxInstanceId === null || this.sandboxInstanceId === undefined) &&
      (this.sandboxDefinitionId === null || this.sandboxDefinitionId === undefined);
    this.calculateTopologySize();
  }

  private calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }
}
