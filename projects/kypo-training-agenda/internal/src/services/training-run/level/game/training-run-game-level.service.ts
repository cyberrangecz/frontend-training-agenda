import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { GameLevel } from '@muni-kypo-crp/training-model';
import { Hint } from '@muni-kypo-crp/training-model';
import { FlagCheck } from '@muni-kypo-crp/training-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HintButton } from '../../../../model/hint-button';
import { RunningTrainingRunService } from '../../running/running-training-run.service';

export abstract class TrainingRunGameLevelService {
  protected constructor(protected dialog: MatDialog, protected runningTrainingRunService: RunningTrainingRunService) {}

  protected hintsSubject$: BehaviorSubject<HintButton[]>;
  hints$: Observable<HintButton[]>;

  protected displayedHintsContentSubject$: BehaviorSubject<string>;
  displayedHintsContent$: Observable<string>;

  protected isSolutionRevealedSubject$: BehaviorSubject<boolean>;
  isSolutionRevealed$: Observable<boolean>;

  protected isCorrectFlagSubmittedSubject$: BehaviorSubject<boolean>;
  isCorrectFlagSubmitted$: Observable<boolean>;

  protected isLoadingSubject$: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  abstract submitFlag(flag: string): Observable<any>;

  abstract revealSolution(level: GameLevel): Observable<string>;

  abstract revealHint(hint: Hint): Observable<Hint>;

  abstract getAccessFile(): Observable<boolean>;

  init(level: GameLevel) {
    this.initObservables();
    this.initHints(level.hints);
    this.initSolutionState(level);
  }

  protected initObservables() {
    this.hintsSubject$ = new BehaviorSubject([]);
    this.hints$ = this.hintsSubject$.asObservable();
    this.displayedHintsContentSubject$ = new BehaviorSubject(undefined);
    this.displayedHintsContent$ = this.displayedHintsContentSubject$.asObservable();
    this.isSolutionRevealedSubject$ = new BehaviorSubject(false);
    this.isSolutionRevealed$ = this.isSolutionRevealedSubject$.asObservable();
    this.isCorrectFlagSubmittedSubject$ = new BehaviorSubject(false);
    this.isCorrectFlagSubmitted$ = this.isCorrectFlagSubmittedSubject$.asObservable();
    this.isLoadingSubject$ = new BehaviorSubject(false);
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  protected initSolutionState(level: GameLevel) {
    if (level.hasSolution()) {
      this.isSolutionRevealedSubject$.next(true);
      this.onSolutionRevealed(level.solution);
    }
  }

  protected initHints(hints: Hint[]) {
    const hintButtons: HintButton[] = [];
    hints.forEach((hint, index) => {
      hintButtons.push(new HintButton(hint.isRevealed(), hint));
      if (hint.isRevealed()) {
        this.addHintContent(hint, index + 1);
      }
    });
    this.hintsSubject$.next(hintButtons);
  }

  protected onHintRevealed(hint: Hint) {
    const hintButtons = this.hintsSubject$.getValue();
    const hintToRevealIndex = hintButtons.findIndex((hintButton) => hintButton.hint.id === hint.id);
    if (hintToRevealIndex !== -1) {
      const hintToReveal = hintButtons[hintToRevealIndex];
      hintToReveal.disable();
      hintToReveal.hint = hint;
      hintButtons[hintToRevealIndex] = hintToReveal;
      this.hintsSubject$.next(hintButtons);
      this.addHintContent(hint, hintToRevealIndex + 1);
    }
  }

  protected addHintContent(hint: Hint, order: number) {
    let content = this.displayedHintsContentSubject$.getValue();
    const hintContent = '\n\n## Hint ' + order + ': ' + hint.title + '\n' + hint.content;
    if (content) {
      content += hintContent;
    } else {
      content = hintContent;
    }
    this.displayedHintsContentSubject$.next(content);
  }

  protected onSolutionRevealed(solution: string) {
    this.displayedHintsContentSubject$.next(solution);
    this.isSolutionRevealedSubject$.next(true);
  }

  protected shouldSolutionBeRevealed(flagCheck: FlagCheck) {
    return !this.isSolutionRevealedSubject$.getValue() && !flagCheck.hasRemainingAttempts();
  }

  protected onCorrectFlagSubmitted(): Observable<any> {
    this.isCorrectFlagSubmittedSubject$.next(true);
    return this.runningTrainingRunService.next();
  }

  protected onWrongFlagSubmitted(flagCheck: FlagCheck): Observable<any> {
    if (this.shouldSolutionBeRevealed(flagCheck)) {
      this.onSolutionRevealed(flagCheck.solution);
    }
    return this.displayWrongFlagDialog(flagCheck);
  }

  protected displayWrongFlagDialog(flagCheck: FlagCheck): Observable<SentinelDialogResultEnum> {
    let dialogMessage = 'You have submitted incorrect flag.\n';
    dialogMessage +=
      !this.isSolutionRevealedSubject$.getValue() && flagCheck.remainingAttempts > 0
        ? `You have ${flagCheck.remainingAttempts} remaining attempts.`
        : 'Please insert the flag according to revealed solution.';

    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig('Incorrect Flag', dialogMessage, '', 'OK'),
    });
    return dialogRef.afterClosed();
  }

  protected displayTakeHintDialog(hint: Hint): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Reveal Hint',
        `Do you want to reveal hint "${hint.title}"?
 It will cost you ${hint.penalty} points.`,
        'Cancel',
        'Reveal'
      ),
    });
    return dialogRef.afterClosed();
  }

  protected displayRevealSolutionDialog(solutionPenalized: boolean): Observable<SentinelDialogResultEnum> {
    let dialogMessage = 'Do you want to reveal solution of this level?';
    dialogMessage += solutionPenalized ? '\n All your points will be subtracted.' : '';

    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig('Reveal Solution', dialogMessage, 'Cancel', 'Reveal'),
    });
    return dialogRef.afterClosed();
  }
}
