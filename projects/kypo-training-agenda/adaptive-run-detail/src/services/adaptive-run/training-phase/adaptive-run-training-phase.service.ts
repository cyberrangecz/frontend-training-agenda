import { MatDialog } from '@angular/material/dialog';
import { RunningAdaptiveRunService } from '../running/running-adaptive-run.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhaseAnswerCheck, LevelAnswerCheck, TrainingPhase } from '@muni-kypo-crp/training-model';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';

export abstract class AdaptiveRunTrainingPhaseService {
  protected constructor(protected dialog: MatDialog, protected runningAdaptiveRunService: RunningAdaptiveRunService) {}

  protected isSolutionRevealedSubject$: BehaviorSubject<boolean>;
  isSolutionRevealed$: Observable<boolean>;

  protected displayedSolutionContentSubject$: BehaviorSubject<string>;
  displayedSolutionContent$: Observable<string>;

  protected isCorrectAnswerSubmittedSubject$: BehaviorSubject<boolean>;
  isCorrectAnswerSubmitted$: Observable<boolean>;

  protected isLoadingSubject$: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  abstract submitAnswer(Answer: string): Observable<any>;
  abstract revealSolution(): Observable<string>;
  abstract getAccessFile(): Observable<boolean>;

  init(phase: TrainingPhase): void {
    this.initObservables();
    this.initSolutionState(phase);
  }

  protected initObservables(): void {
    this.displayedSolutionContentSubject$ = new BehaviorSubject(undefined);
    this.displayedSolutionContent$ = this.displayedSolutionContentSubject$.asObservable();
    this.isSolutionRevealedSubject$ = new BehaviorSubject(false);
    this.isSolutionRevealed$ = this.isSolutionRevealedSubject$.asObservable();
    this.isCorrectAnswerSubmittedSubject$ = new BehaviorSubject(false);
    this.isCorrectAnswerSubmitted$ = this.isCorrectAnswerSubmittedSubject$.asObservable();
    this.isLoadingSubject$ = new BehaviorSubject(false);
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  protected initSolutionState(phase: TrainingPhase): void {
    if (phase.currentTask.solution !== null && phase.currentTask.solution !== undefined) {
      this.onSolutionRevealed(phase.currentTask.solution);
    }
  }

  protected onSolutionRevealed(solution: string): void {
    this.displayedSolutionContentSubject$.next(solution);
    this.isSolutionRevealedSubject$.next(true);
  }

  protected shouldSolutionBeRevealed(answerCheck: PhaseAnswerCheck): boolean {
    return !this.isSolutionRevealedSubject$.getValue() && !answerCheck.hasRemainingAttempts();
  }

  protected onCorrectAnswerSubmitted(): Observable<any> {
    this.isCorrectAnswerSubmittedSubject$.next(true);
    return this.runningAdaptiveRunService.next();
  }

  protected onWrongAnswerSubmitted(answerCheck: PhaseAnswerCheck): Observable<any> {
    if (this.shouldSolutionBeRevealed(answerCheck)) {
      this.onSolutionRevealed(answerCheck.solution);
    }
    return this.displayWrongAnswerDialog(answerCheck);
  }

  protected displayWrongAnswerDialog(answerCheck: LevelAnswerCheck): Observable<SentinelDialogResultEnum> {
    let dialogMessage = 'You have submitted incorrect answer.\n';
    dialogMessage +=
      !this.isSolutionRevealedSubject$.getValue() && answerCheck.remainingAttempts > 0
        ? `You have ${answerCheck.remainingAttempts} remaining attempts.`
        : 'Please insert the answer according to revealed solution.';

    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig('Incorrect Answer', dialogMessage, '', 'OK'),
    });
    return dialogRef.afterClosed();
  }

  protected displayRevealSolutionDialog(): Observable<SentinelDialogResultEnum> {
    const dialogMessage = 'Do you want to reveal solution of this phase?';
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig('Reveal Solution', dialogMessage, 'Cancel', 'Reveal'),
    });
    return dialogRef.afterClosed();
  }
}
