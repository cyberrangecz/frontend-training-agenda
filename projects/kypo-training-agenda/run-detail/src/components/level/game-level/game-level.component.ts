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
import { GameLevel } from 'kypo-training-model';
import { Kypo2TopologyErrorService } from 'kypo2-topology-graph';
import { Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { HintButton, TrainingRunGameLevelService } from 'kypo-training-agenda/internal';
import { TrainingErrorHandler } from 'kypo-training-agenda';

@Component({
  selector: 'kypo-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component of a game level in a training run. Users needs to find out correct solution (flag) and submit it
 * before he can continue to the next level. User can optionally take hints.
 */
export class GameLevelComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() level: GameLevel;
  @Input() isLast: boolean;
  @Input() sandboxId: number;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  flag: string;
  displayedHintsContent$: Observable<string>;
  isCorrectFlagSubmitted$: Observable<boolean>;
  isSolutionRevelead$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hintsButtons$: Observable<HintButton[]>;

  constructor(
    private gameLevelService: TrainingRunGameLevelService,
    private topologyErrorService: Kypo2TopologyErrorService,
    private errorHandler: TrainingErrorHandler
  ) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTopologySize();
  }

  ngOnInit() {
    this.initTopology();
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.initTopology();
      this.gameLevelService.init(this.level);
      this.displayedHintsContent$ = this.gameLevelService.displayedHintsContent$;
      this.isCorrectFlagSubmitted$ = this.gameLevelService.isCorrectFlagSubmitted$;
      this.isSolutionRevelead$ = this.gameLevelService.isSolutionRevealed$;
      this.isLoading$ = this.gameLevelService.isLoading$;
      this.hintsButtons$ = this.gameLevelService.hints$;
    }
  }

  onNext() {
    this.next.emit();
  }

  /**
   * Calls service to reveal hint
   * @param hintButton hint button clicked by the user
   */
  revealHint(hintButton: HintButton) {
    this.gameLevelService.revealHint(hintButton.hint).pipe(take(1)).subscribe();
  }

  /**
   * Calls service to reveal solution
   */
  revealSolution() {
    this.gameLevelService.revealSolution(this.level).pipe(take(1)).subscribe();
  }

  /**
   * Calls service to check whether the flag is correct
   */
  submitFlag() {
    this.gameLevelService
      .submitFlag(this.flag)
      .pipe(take(1))
      .subscribe((resp) => (this.flag = ''));
  }

  /**
   * Calls service to download ssh access for user
   */
  download() {
    this.gameLevelService.getAccessFile().pipe(take(1)).subscribe();
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
    this.topologyErrorService.error$.pipe(takeWhile((_) => this.isAlive)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }
}
