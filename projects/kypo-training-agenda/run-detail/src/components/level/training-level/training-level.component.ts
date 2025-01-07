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
import { delay, filter, map, take, tap } from 'rxjs/operators';
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

  private dragBehaviourSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private dragBufferedBehaviourSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private dragAccumulator = 0;

  topologyWidth: BehaviorSubject<number> = new BehaviorSubject(undefined);
  topologyHeight: BehaviorSubject<number> = new BehaviorSubject(undefined);
  displayedHintsContent$: Observable<string>;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hintsButtons$: Observable<HintButton[]>;
  displayedSolutionContent$: Observable<string>;
  destroyRef = inject(DestroyRef);

  private windowWidth = window.innerWidth;

  constructor(
    private trainingLevelService: TrainingRunTrainingLevelService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler,
  ) {
    this.dragBehaviourSubject
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((value) => {
          this.dragAccumulator += value;
        }),
        filter(() => Math.abs(this.dragBufferedBehaviourSubject.value - this.dragAccumulator) > 20),
        map(() => this.dragAccumulator),
      )
      .subscribe((value) => {
        this.dragAccumulator = 0;
        this.dragBufferedBehaviourSubject.next(value);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
    if (event.target.innerWidth < 1400) {
      this.leftPanel.nativeElement.removeAttribute('style');
      this.rightPanel.nativeElement.removeAttribute('style');
      return;
    }
    if (Math.abs(event.target.innerWidth - this.windowWidth) > 20) {
      this.recalculateDividerPosition(event.target.innerWidth - this.windowWidth);
      this.saveDividerPosition();
      this.windowWidth = event.target.innerWidth;
    }
  }

  private recalculateDividerPosition(widthDifference: number): void {
    if (this.leftPanel.nativeElement.hasAttribute('style') && this.rightPanel.nativeElement.hasAttribute('style')) {
      const leftPanelWidth = this.leftPanel.nativeElement.offsetWidth;
      const rightPanelWidth = this.rightPanel.nativeElement.offsetWidth;
      const leftPanelNewWidth = leftPanelWidth + widthDifference / 2;
      const rightPanelNewWidth = rightPanelWidth + widthDifference / 2;
      this.leftPanel.nativeElement.style.width = `${leftPanelNewWidth}px`;
      this.rightPanel.nativeElement.style.width = `${rightPanelNewWidth}px`;
    }
  }

  private saveDividerPosition(): void {
    const data = {
      leftPanelWidth: this.leftPanel.nativeElement.offsetWidth,
      rightPanelWidth: this.rightPanel.nativeElement.offsetWidth,
      windowWidth: window.innerWidth,
    };
    localStorage.setItem('dividerPosition', JSON.stringify(data));
  }

  private loadDividerPosition(): void {
    const data = localStorage.getItem('dividerPosition');
    if (data) {
      const parsedData = JSON.parse(data);
      const windowWidthDifference = window.innerWidth - parsedData.windowWidth;
      this.leftPanel.nativeElement.style.width = `${parsedData.leftPanelWidth + windowWidthDifference / 2}px`;
      this.rightPanel.nativeElement.style.width = `${parsedData.rightPanelWidth + windowWidthDifference / 2}px`;
      this.recalculateDividerPosition(window.innerWidth - parsedData.windowWidth);
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
    this.loadDividerPosition();
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
    this.topologyWidth.next(this.rightPanel.nativeElement.getBoundingClientRect().width);
    this.topologyHeight.next(this.rightPanel.nativeElement.getBoundingClientRect().height + 32); //32 for ssh access button
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
    this.saveDividerPosition();
    this.calculateTopologySize();
  }

  mouseDown(event: MouseEvent): void {
    const subscription = this.dragBufferedBehaviourSubject.subscribe({
      next: (value) => this.resizePanels(value, this),
    });

    const mouseUp = (event: MouseEvent) => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      subscription.unsubscribe();
    };

    const mouseMove = (event: MouseEvent) => {
      this.dragBehaviourSubject.next(event.movementX);
    };

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
    event.preventDefault();
    event.stopPropagation();
  }
}
