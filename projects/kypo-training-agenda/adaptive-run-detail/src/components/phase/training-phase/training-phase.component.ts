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
import { TrainingPhase } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { delay, take, takeWhile } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { AdaptiveRunTrainingPhaseService } from './../../../services/adaptive-run/training-phase/adaptive-run-training-phase.service';
import { AdaptiveRunTrainingPhaseConcreteService } from '../../../services/adaptive-run/training-phase/adaptive-run-training-phase-concrete.service';

@Component({
  selector: 'kypo-training-phase',
  templateUrl: './training-phase.component.html',
  styleUrls: ['./training-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AdaptiveRunTrainingPhaseService, useClass: AdaptiveRunTrainingPhaseConcreteService }],
})
export class TrainingPhaseComponent extends SentinelBaseDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() phase: TrainingPhase;
  @Input() isLast: boolean;
  @Input() isPhaseAnswered: boolean;
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
  isCorrectAnswerSubmitted$: Observable<boolean>;
  isSolutionRevealed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  displayedSolutionContent$: Observable<string>;
  calculating = false;
  controlsWrapped: boolean;

  constructor(
    private trainingPhaseService: AdaptiveRunTrainingPhaseService,
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
    if ('phase' in changes) {
      this.answer = '';
      this.initTopology();
      this.trainingPhaseService.init(this.phase, this.isPhaseAnswered);
      this.isCorrectAnswerSubmitted$ = this.trainingPhaseService.isCorrectAnswerSubmitted$;
      this.isSolutionRevealed$ = this.trainingPhaseService.isSolutionRevealed$;
      this.isLoading$ = this.trainingPhaseService.isLoading$;
      this.displayedSolutionContent$ = this.trainingPhaseService.displayedSolutionContent$;
    }
  }

  ngAfterViewInit(): void {
    this.setContentMargin();
    this.controlsWrapped = this.isWrapped();
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
    this.isTopologyDisplayed =
      (this.sandboxInstanceId === null || this.sandboxInstanceId === undefined) &&
      (this.sandboxDefinitionId === null || this.sandboxDefinitionId === undefined);
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
