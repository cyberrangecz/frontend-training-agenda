import {
  AfterViewInit,
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
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { Observable } from 'rxjs';
import { delay, take, takeWhile } from 'rxjs/operators';
import { HintButton } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingLevel } from '@muni-kypo-crp/training-model';
import { TrainingRunTrainingLevelService } from './../../../services/training-run/level/training/training-run-training-level.service';
import { TrainingRunTrainingLevelConcreteService } from './../../../services/training-run/level/training/training-run-training-level-concrete.service';

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
export class TrainingLevelComponent extends SentinelBaseDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() level: TrainingLevel;
  @Input() isLast: boolean;
  @Input() isLevelAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: number;
  @Input() sandboxDefinitionId: number;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('controlsContainer', { static: false, read: ElementRef }) controlsContainer: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  answer: string;
  displayedHintsContent$: Observable<string>;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hintsButtons$: Observable<HintButton[]>;
  displayedSolutionContent$: Observable<string>;
  controlsWrapped: boolean;

  constructor(
    private trainingLevelService: TrainingRunTrainingLevelService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler
  ) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
    this.setContentMargin();
    this.controlsWrapped = this.isWrapped();
  }

  ngOnInit(): void {
    this.initTopology();
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.initTopology();
      this.answer = '';
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
    this.setContentMargin();
    this.controlsWrapped = this.isWrapped();
  }

  onNext(): void {
    this.next.emit();
  }

  /**
   * Calls service to reveal hint
   * @param hintButton hint button clicked by the user
   */
  revealHint(hintButton: HintButton): void {
    this.trainingLevelService
      .revealHint(hintButton.hint)
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

  /**
   * Calls service to check whether the answer is correct
   */
  submitAnswer(): void {
    this.trainingLevelService.submitAnswer(this.answer).pipe(take(1)).subscribe();
    this.scrollToTop();
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
    this.topologyErrorService.error$.pipe(takeWhile(() => this.isAlive)).subscribe({
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

  private scrollToTop(): void {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }

  // Workaround since position:sticky is not working due to overflow in mat-content
  private getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }

  private setContentMargin(): void {
    this.content.nativeElement.setAttribute('style', `margin-bottom:${this.getControlsPanelOffset()}`);
  }

  // Checks if items in control bar are wrapped based on their top offset
  isWrapped(): boolean {
    if (!this.isBacktracked && this.controlsContainer) {
      const elements = Array.from(this.controlsContainer.nativeElement.childNodes).filter(
        (elem: HTMLElement) => elem.offsetTop !== undefined
      );
      return elements.some((elem: HTMLElement) => elem.offsetTop !== (elements[0] as HTMLElement).offsetTop);
    }
    return false;
  }
}
