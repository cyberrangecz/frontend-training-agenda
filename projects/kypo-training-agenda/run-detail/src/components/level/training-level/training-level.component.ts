import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Kypo2TopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { HintButton, TrainingRunTrainingLevelService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-training-level',
  templateUrl: './training-level.component.html',
  styleUrls: ['./training-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component of a training level in a training run. Users needs to find out correct solution (answer) and submit it
 * before he can continue to the next level. User can optionally take hints.
 */
export class TrainingLevelComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() level: TrainingLevel;
  @Input() isLast: boolean;
  @Input() sandboxId: number;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  answer: string;
  displayedHintsContent$: Observable<string>;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevelead$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hintsButtons$: Observable<HintButton[]>;

  constructor(
    private trainingLevelService: TrainingRunTrainingLevelService,
    private topologyErrorService: Kypo2TopologyErrorService,
    private errorHandler: TrainingErrorHandler
  ) {
    super();
  }

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
      this.answer = '';
      this.trainingLevelService.init(this.level);
      this.displayedHintsContent$ = this.trainingLevelService.displayedHintsContent$;
      this.isCorrectAnswerSubmitted$ = this.trainingLevelService.isCorrectAnswerSubmitted$;
      this.isSolutionRevelead$ = this.trainingLevelService.isSolutionRevealed$;
      this.isLoading$ = this.trainingLevelService.isLoading$;
      this.hintsButtons$ = this.trainingLevelService.hints$;
    }
  }

  onNext(): void {
    this.next.emit();
  }

  /**
   * Calls service to reveal hint
   * @param hintButton hint button clicked by the user
   */
  revealHint(hintButton: HintButton): void {
    this.trainingLevelService.revealHint(hintButton.hint).pipe(take(1)).subscribe();
  }

  /**
   * Calls service to reveal solution
   */
  revealSolution(): void {
    this.trainingLevelService.revealSolution(this.level).pipe(take(1)).subscribe();
  }

  /**
   * Calls service to check whether the answer is correct
   */
  submitAnswer(): void {
    this.trainingLevelService.submitAnswer(this.answer).pipe(take(1)).subscribe();
  }

  /**
   * Checks whether user confirmed answer input with Enter
   * @param event keydown event
   */
  keyboardSubmitAnswer(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submitAnswer();
    }
  }

  /**
   * Calls service to download ssh access for user
   */
  download(): void {
    this.trainingLevelService.getAccessFile().pipe(take(1)).subscribe();
  }

  private initTopology() {
    this.isTopologyDisplayed = this.sandboxId === null || this.sandboxId === undefined;
    this.calculateTopologySize();
  }

  private calculateTopologySize() {
    this.topologyWidth =
      window.innerWidth >= 1920
        ? this.rightPanelDiv.nativeElement.getBoundingClientRect().width
        : window.innerWidth / 2;
    this.topologyHeight = (this.topologyWidth / 4) * 3;
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeWhile(() => this.isAlive)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }
}
