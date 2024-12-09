import {
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
import { AccessPhase } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { take } from 'rxjs/operators';
import { AdaptiveRunAccessPhaseService } from './../../../services/adaptive-run/access-phase/adaptive-run-access-phase.service';
import { AdaptiveRunAccessPhaseConcreteService } from '../../../services/adaptive-run/access-phase/adaptive-run-access-phase-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-access-phase',
  templateUrl: './access-phase.component.html',
  styleUrls: ['./access-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AdaptiveRunAccessPhaseService, useClass: AdaptiveRunAccessPhaseConcreteService }],
})
export class AccessPhaseComponent implements OnInit, OnChanges {
  @Input() phase: AccessPhase;
  @Input() isLast: boolean;
  @Input() isPhaseAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: number;
  @Input() sandboxDefinitionId: number;
  @Input() localEnvironment: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('topology') topology: ElementRef<HTMLDivElement>;

  topologyWidth: number;
  topologyHeight: number;
  isCorrectPasskeySubmitted$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  destroyRef = inject(DestroyRef);

  protected readonly String = String;

  constructor(
    private accessPhaseService: AdaptiveRunAccessPhaseService,
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
      this.accessPhaseService.init(this.isPhaseAnswered);
      this.isCorrectPasskeySubmitted$ = this.accessPhaseService.isCorrectPasskeySubmitted$;
      this.isLoading$ = this.accessPhaseService.isLoading$;
    }
  }

  onNext(): void {
    this.next.emit();
  }

  onAnswerSubmitted(passkey: string): void {
    this.accessPhaseService.submitPasskey(passkey).pipe(take(1)).subscribe();
  }

  download(): void {
    this.accessPhaseService.getAccessFile().pipe(take(1)).subscribe();
  }

  private calculateTopologySize() {
    if (!this.topology) {
      return;
    }
    this.topologyWidth = this.topology.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topology.nativeElement.getBoundingClientRect().height + 32; //32 for ssh access button
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }
}
