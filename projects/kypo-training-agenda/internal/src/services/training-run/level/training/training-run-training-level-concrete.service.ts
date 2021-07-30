import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentinelDialogResultEnum } from '@sentinel/components/dialogs';
import { TrainingRunApi } from '@muni-kypo-crp/training-api';
import { Hint, TrainingLevel } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingRunTrainingLevelService } from './training-run-training-level.service';
import { RunningTrainingRunService } from '../../running/running-training-run.service';
import { SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';

@Injectable()
/**
 * Handles events and actions specific for training level in training run
 */
export class TrainingRunTrainingLevelConcreteService extends TrainingRunTrainingLevelService {
  constructor(
    private api: TrainingRunApi,
    private sandboxApi: SandboxInstanceApi,
    private errorHandler: TrainingErrorHandler,
    protected dialog: MatDialog,
    protected runningTrainingRunService: RunningTrainingRunService
  ) {
    super(dialog, runningTrainingRunService);
  }

  /**
   * Retrieves file for ssh access for trainee
   */
  getAccessFile(): Observable<any> {
    return this.sandboxApi.getUserSshAccess(this.runningTrainingRunService.sandboxInstanceId).pipe(
      tap(
        (_) => _,
        (err) => {
          this.errorHandler.emit(err, 'Access files for trainee');
        }
      )
    );
  }

  /**
   * Evaluates if answer entered by trainee is correct
   * @param answer answer entered by trainee
   */
  submitAnswer(answer: string): Observable<any> {
    this.isLoadingSubject$.next(true);
    return this.api.isCorrectAnswer(this.runningTrainingRunService.trainingRunId, answer).pipe(
      switchMap((answerCheckResult) =>
        answerCheckResult.isCorrect ? this.onCorrectAnswerSubmitted() : this.onWrongAnswerSubmitted(answerCheckResult)
      ),
      tap(
        () => this.isLoadingSubject$.next(false),
        (err) => {
          this.isLoadingSubject$.next(false);
          this.errorHandler.emit(err, 'Submitting answer');
        }
      )
    );
  }

  /**
   * Displays solution of current training level
   */
  revealSolution(level: TrainingLevel): Observable<string> {
    return this.displayRevealSolutionDialog(level.solutionPenalized).pipe(
      switchMap((result) =>
        result === SentinelDialogResultEnum.CONFIRMED
          ? this.callApiToRevealSolution(this.runningTrainingRunService.trainingRunId)
          : EMPTY
      )
    );
  }

  /**
   * Displays selected hint
   * @param hint  selected hint
   */
  revealHint(hint: Hint): Observable<Hint> {
    return this.displayTakeHintDialog(hint).pipe(
      switchMap((result) =>
        result === SentinelDialogResultEnum.CONFIRMED
          ? this.callApiToTakeHint(this.runningTrainingRunService.trainingRunId, hint)
          : EMPTY
      )
    );
  }

  private callApiToRevealSolution(trainingRunId: number): Observable<string> {
    this.isLoadingSubject$.next(true);
    return this.api.takeSolution(trainingRunId).pipe(
      tap(
        (solution) => {
          this.isLoadingSubject$.next(false);
          this.onSolutionRevealed(solution);
        },
        (err) => {
          this.isLoadingSubject$.next(false);
          this.errorHandler.emit(err, 'Revealing solution');
        }
      )
    );
  }

  private callApiToTakeHint(trainingRunId: number, hint: Hint): Observable<Hint> {
    this.isLoadingSubject$.next(true);
    return this.api.takeHint(trainingRunId, hint.id).pipe(
      tap(
        (takenHint) => {
          this.isLoadingSubject$.next(false);
          this.onHintRevealed(takenHint);
        },
        (err) => {
          this.isLoadingSubject$.next(false);
          this.errorHandler.emit(err, `Taking hint "${hint.title}"`);
        }
      )
    );
  }
}
