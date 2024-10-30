import { Injectable } from '@angular/core';
import { AdaptiveRunTrainingPhaseService } from './adaptive-run-training-phase.service';
import { AdaptiveRunApi } from '@muni-kypo-crp/training-api';
import { SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { MatDialog } from '@angular/material/dialog';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { RunningAdaptiveRunService } from '../running/running-adaptive-run.service';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SentinelDialogResultEnum } from '@sentinel/components/dialogs';

@Injectable()
export class AdaptiveRunTrainingPhaseConcreteService extends AdaptiveRunTrainingPhaseService {
  constructor(
    private api: AdaptiveRunApi,
    private sandboxApi: SandboxInstanceApi,
    private errorHandler: TrainingErrorHandler,
    protected dialog: MatDialog,
    protected runningAdaptiveRunService: RunningAdaptiveRunService,
  ) {
    super(dialog, runningAdaptiveRunService);
  }

  getAccessFile(): Observable<any> {
    return this.sandboxApi.getUserSshAccess(this.runningAdaptiveRunService.sandboxInstanceId).pipe(
      tap(
        (_) => _,
        (err) => {
          this.errorHandler.emit(err, 'Access files for trainee');
        },
      ),
    );
  }

  submitAnswer(answer: string): Observable<any> {
    this.isLoadingSubject$.next(true);
    return this.api.isCorrectAnswer(this.runningAdaptiveRunService.trainingRunId, answer).pipe(
      switchMap((answerCheckResult) =>
        answerCheckResult.isCorrect ? this.onCorrectAnswerSubmitted() : this.onWrongAnswerSubmitted(answerCheckResult),
      ),
      tap(
        () => this.isLoadingSubject$.next(false),
        (err) => {
          this.isLoadingSubject$.next(false);
          this.errorHandler.emit(err, 'Submitting answer');
        },
      ),
    );
  }

  revealSolution(): Observable<string> {
    return this.displayRevealSolutionDialog().pipe(
      switchMap((result) =>
        result === SentinelDialogResultEnum.CONFIRMED
          ? this.callApiToRevealSolution(this.runningAdaptiveRunService.trainingRunId)
          : EMPTY,
      ),
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
        },
      ),
    );
  }
}
