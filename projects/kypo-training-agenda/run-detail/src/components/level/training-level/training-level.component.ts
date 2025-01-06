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
import { BehaviorSubject, buffer, Observable, skipWhile, timer } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
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

  @ViewChild('topologyContainer') topology: ElementRef<HTMLDivElement>;
  @ViewChild('leftPanel') leftPanel: ElementRef<HTMLDivElement>;
  @ViewChild('rightPanel') rightPanel: ElementRef<HTMLDivElement>;

  private dragChange = new BehaviorSubject(0);

  topologyWidth: BehaviorSubject<number> = new BehaviorSubject(undefined);
  topologyHeight: BehaviorSubject<number> = new BehaviorSubject(undefined);
  displayedHintsContent$: Observable<string>;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hintsButtons$: Observable<HintButton[]>;
  displayedSolutionContent$: Observable<string>;
  destroyRef = inject(DestroyRef);

  windowWidth: number = window.innerWidth;

  constructor(
    private trainingLevelService: TrainingRunTrainingLevelService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.recalculateDividerPosition(event.target.innerWidth);
    this.calculateTopologySize();
    this.windowWidth = event.target.innerWidth;
  }

  recalculateDividerPosition(newWidth: number): void {
    if (newWidth < 1400) {
      this.leftPanel.nativeElement.removeAttribute('style');
      this.rightPanel.nativeElement.removeAttribute('style');
      return;
    }
    if (this.leftPanel.nativeElement.hasAttribute('style') && this.rightPanel.nativeElement.hasAttribute('style')) {
      const widthDifference = newWidth - this.windowWidth;
      const leftPanelWidth = this.leftPanel.nativeElement.offsetWidth;
      const rightPanelWidth = this.rightPanel.nativeElement.offsetWidth;
      const leftPanelNewWidth = leftPanelWidth + widthDifference / 2;
      const rightPanelNewWidth = rightPanelWidth - widthDifference / 2;
      this.leftPanel.nativeElement.style.width = `${leftPanelNewWidth}px`;
      this.rightPanel.nativeElement.style.width = `${rightPanelNewWidth}px`;
    }
  }

  ngOnInit(): void {
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.calculateTopologySize();
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

  private calculateTopologySize() {
    if (!this.topology) {
      return;
    }
    this.topologyWidth.next(this.topology.nativeElement.getBoundingClientRect().width);
    this.topologyHeight.next(this.topology.nativeElement.getBoundingClientRect().height + 32); //32 for ssh access button
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }

  private resizePanels(delta: number, context: TrainingLevelComponent): void {
    const leftPanelNewWidth = context.leftPanel.nativeElement.offsetWidth + delta - 16;
    const rightPanelNewWidth = context.rightPanel.nativeElement.offsetWidth - delta;
    context.leftPanel.nativeElement.style.width = `${leftPanelNewWidth}px`;
    context.rightPanel.nativeElement.style.width = `${rightPanelNewWidth}px`;
    this.calculateTopologySize();
  }

  mouseDown(event: MouseEvent): void {
    const subscription = this.dragChange
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        skipWhile((change) => change === 0),
        buffer(timer(0, 50)),
        map((changes) => changes.reduce((acc, change) => acc + change, 0)),
      )
      .subscribe({
        next: (value) => this.resizePanels(value, this),
      });

    const mouseUp = (event: MouseEvent) => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      subscription.unsubscribe();
    };

    const mouseMove = (event: MouseEvent) => {
      this.dragChange.next(event.movementX);
    };

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
    event.preventDefault();
    event.stopPropagation();
  }
}
