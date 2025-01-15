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
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { HintButton } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { Hint, TrainingLevel } from '@muni-kypo-crp/training-model';
import { TrainingRunTrainingLevelService } from './../../../services/training-run/level/training/training-run-training-level.service';
import { TrainingRunTrainingLevelConcreteService } from './../../../services/training-run/level/training/training-run-training-level-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DividerPositionSynchronizerService } from '../../../services/training-run/level/synchronization/divider-position/divider-position-synchronizer.service';
import { sum } from 'd3';
import { thresholdBuffer } from '../../../logic/tresholdBufferPipe';
import { TopologyShareService } from '../../../services/training-run/level/synchronization/topology-size/topology-share.service';

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

  @ViewChild('leftPanel') leftPanel: ElementRef<HTMLDivElement>;
  @ViewChild('rightPanel') rightPanel: ElementRef<HTMLDivElement>;
  @ViewChild('levelContent') levelContent: ElementRef<HTMLDivElement>;

  private dragBehaviourSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  topologyWidth: BehaviorSubject<number> = new BehaviorSubject(undefined);
  topologyHeight: BehaviorSubject<number> = new BehaviorSubject(undefined);
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
    private dividerPositionSynchronizer: DividerPositionSynchronizerService,
    private topologySizeSynchronizer: TopologyShareService,
  ) {}

  ngOnInit(): void {
    this.subscribeToTopologyErrorHandler();
  }

  ngAfterViewInit(): void {
    this.setupDividerPositionListener();
    this.setupTopologySizeListener();
    this.setupDragListener();
    this.topologySizeSynchronizer.emitTopologySizeChange([
      this.rightPanel.nativeElement.getBoundingClientRect().width,
      this.rightPanel.nativeElement.getBoundingClientRect().height,
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.updateTopologySize();
      this.trainingLevelService.init(this.level, this.isLevelAnswered);
      this.displayedHintsContent$ = this.trainingLevelService.displayedHintsContent$;
      this.isCorrectAnswerSubmitted$ = this.trainingLevelService.isCorrectAnswerSubmitted$;
      this.isSolutionRevealed$ = this.trainingLevelService.isSolutionRevealed$;
      this.isLoading$ = this.trainingLevelService.isLoading$;
      this.hintsButtons$ = this.trainingLevelService.hints$;
      this.displayedSolutionContent$ = this.trainingLevelService.displayedSolutionContent$;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 1400) {
      this.unsetPanelWidths();
      this.updateTopologySize();
    } else {
      this.topologySizeSynchronizer.emitTopologySizeChange([
        this.rightPanel.nativeElement.getBoundingClientRect().width,
        this.rightPanel.nativeElement.getBoundingClientRect().height,
      ]);
    }
  }

  private calculateRatio(sliderDelta: number): number {
    return (
      (this.leftPanel.nativeElement.offsetWidth + sliderDelta) /
      (this.rightPanel.nativeElement.offsetWidth + this.leftPanel.nativeElement.offsetWidth)
    );
  }

  private setPanelRatio(ratio: number): void {
    this.leftPanel.nativeElement.style.width = `${ratio * 100}%`;
    this.rightPanel.nativeElement.style.width = `${100 - ratio * 100}%`;
  }

  private unsetPanelWidths(): void {
    this.leftPanel.nativeElement.removeAttribute('style');
    this.rightPanel.nativeElement.removeAttribute('style');
  }

  private setupDragListener(): void {
    this.dragBehaviourSubject
      .pipe(
        thresholdBuffer((values) => Math.abs(sum(values)) > 20),
        map((bufferedValues) => sum(bufferedValues)),
      )
      .subscribe((movement) => {
        this.dividerPositionSynchronizer.emitDividerChange(this.calculateRatio(movement));
        this.topologySizeSynchronizer.emitTopologySizeChange([
          this.rightPanel.nativeElement.getBoundingClientRect().width,
          this.rightPanel.nativeElement.getBoundingClientRect().height,
        ]);
      });
  }

  private setupDividerPositionListener(): void {
    this.dividerPositionSynchronizer
      .getDividerPosition$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ratio: number) => {
        this.setPanelRatio(ratio);
      });
  }

  private setupTopologySizeListener(): void {
    this.topologySizeSynchronizer
      .getTopologySize$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([width, height]) => {
        this.topologyWidth.next(width);
        this.topologyHeight.next(height);
      });
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

  private updateTopologySize() {
    if (
      !this.rightPanel ||
      !this.rightPanel.nativeElement ||
      this.rightPanel.nativeElement.getBoundingClientRect().width < 510
    ) {
      return;
    }
    this.topologyWidth.next(this.rightPanel.nativeElement.getBoundingClientRect().width);
    this.topologyHeight.next(this.rightPanel.nativeElement.getBoundingClientRect().height + 32); //32 for ssh access button
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }

  mouseDown(event: MouseEvent): void {
    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };

    const mouseMove = () => {
      this.dragBehaviourSubject.next(event.movementX);
    };

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
    event.preventDefault();
    event.stopPropagation();
  }
}
