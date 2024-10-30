import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRunApi } from '@muni-kypo-crp/training-api';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { RunningTrainingRunService } from '../../running/running-training-run.service';
import { SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { TrainingRunAccessLevelService } from './training-run-access-level.service';

@Injectable()
/**
 * Handles events and actions specific for training level in training run
 */
export class TrainingRunAccessLevelConcreteService extends TrainingRunAccessLevelService {
  constructor(
    private api: TrainingRunApi,
    private sandboxApi: SandboxInstanceApi,
    private errorHandler: TrainingErrorHandler,
    protected dialog: MatDialog,
    protected runningTrainingRunService: RunningTrainingRunService,
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
        },
      ),
    );
  }

  /**
   * Evaluates if passkey entered by trainee is correct
   * @param passkey passkey entered by trainee
   */
  submitPasskey(passkey: string): Observable<any> {
    this.isLoadingSubject$.next(true);
    return this.api.isCorrectPasskey(this.runningTrainingRunService.trainingRunId, passkey).pipe(
      switchMap((isCorrect) => (isCorrect ? this.onCorrectPasskeySubmitted() : this.onWrongPasskeySubmitted())),
      tap(
        () => this.isLoadingSubject$.next(false),
        (err) => {
          this.isLoadingSubject$.next(false);
          this.errorHandler.emit(err, 'Submitting passkey');
        },
      ),
    );
  }
}
