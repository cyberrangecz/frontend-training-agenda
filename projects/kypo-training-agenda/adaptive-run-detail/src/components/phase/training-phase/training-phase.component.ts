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
import { TrainingPhase } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { Kypo2TopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { delay, take, takeWhile } from 'rxjs/operators';
import { AdaptiveRunTrainingPhaseService } from '@muni-kypo-crp/training-agenda/internal';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'kypo-training-phase',
  templateUrl: './training-phase.component.html',
  styleUrls: ['./training-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPhaseComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() phase: TrainingPhase;
  @Input() isLast: boolean;
  @Input() sandboxId: number;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('controlsContainer', { static: true, read: ElementRef }) controlsContainer: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  answer: string;
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  displayedSolutionContent$: Observable<string>;
  calculating = false;

  constructor(
    private trainingPhaseService: AdaptiveRunTrainingPhaseService,
    private topologyErrorService: Kypo2TopologyErrorService,
    private errorHandler: TrainingErrorHandler,
    private scroller: ViewportScroller
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
    if ('phase' in changes) {
      this.answer = '';
      this.initTopology();
      this.trainingPhaseService.init(this.phase);
      this.isCorrectAnswerSubmitted$ = this.trainingPhaseService.isCorrectAnswerSubmitted$;
      this.isSolutionRevealed$ = this.trainingPhaseService.isSolutionRevealed$;
      this.isLoading$ = this.trainingPhaseService.isLoading$;
      this.displayedSolutionContent$ = this.trainingPhaseService.displayedSolutionContent$;
    }
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

  submitAnswer(): void {
    this.calculating = true;
    this.trainingPhaseService
      .submitAnswer(this.answer)
      .pipe(take(1))
      .subscribe(() => (this.calculating = false));
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

  download(): void {
    this.trainingPhaseService.getAccessFile().pipe(take(1)).subscribe();
  }

  private calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }

  private initTopology() {
    this.isTopologyDisplayed = this.sandboxId === null || this.sandboxId === undefined;
    this.calculateTopologySize();
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
  getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }

  // Checks if items in control bar are wrapped based on their top offset
  isWrapped(): boolean {
    const elements = Array.from(this.controlsContainer.nativeElement.childNodes).filter(
      (elem: HTMLElement) => elem.offsetTop !== undefined
    );
    return elements.some((elem: HTMLElement) => elem.offsetTop !== (elements[0] as HTMLElement).offsetTop);
  }
}
