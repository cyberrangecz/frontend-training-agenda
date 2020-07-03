import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum,
} from 'csirt-mu-common';
import { KypoPaginatedResource } from 'kypo-common';
import { KypoRequestedPagination } from 'kypo-common';
import { SandboxAllocationUnitsApi, SandboxInstanceApi } from 'kypo-sandbox-api';
import { SandboxInstance } from 'kypo-sandbox-model';
import { TrainingInstanceApi, TrainingRunApi } from 'kypo-training-api';
import { TrainingRun } from 'kypo-training-model';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '../../client/training-error.handler.service';
import { TrainingNotificationService } from '../../client/training-notification.service';
import { TrainingAgendaContext } from '../../internal/training-agenda-context.service';
import { ActiveTrainingRunService } from './active-training-run.service';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get active training runs and poll in regular intervals.
 */
@Injectable()
export class ActiveTrainingRunConcreteService extends ActiveTrainingRunService {
  private lastTrainingInstanceId: number;

  constructor(
    private trainingInstanceApi: TrainingInstanceApi,
    private trainingRunApi: TrainingRunApi,
    private sandboxApi: SandboxInstanceApi,
    private sauApi: SandboxAllocationUnitsApi,
    private dialog: MatDialog,
    private context: TrainingAgendaContext,
    private notificationService: TrainingNotificationService,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize, context.config.pollingPeriod);
  }

  /**
   * Gel all active training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which active training runs should be requested
   * @param pagination requested pagination
   */
  getAll(
    trainingInstanceId: number,
    pagination: KypoRequestedPagination
  ): Observable<KypoPaginatedResource<TrainingRun>> {
    this.onManualResourceRefresh(pagination, trainingInstanceId);
    return this.trainingInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination).pipe(
      tap(
        (runs) => {
          this.resourceSubject$.next(runs);
        },
        (err) => this.onGetAllError()
      )
    );
  }

  /**
   * Delete sandbox instance associated with training instance and refreshes list of all active training runs
   * as a side effect or handles error
   * @param trainingRun training run whose sandbox should be deleted
   */
  deleteSandbox(trainingRun: TrainingRun): Observable<any> {
    if (trainingRun.hasPlayer() && trainingRun.isRunning()) {
      return this.displayDeleteSandboxDialog(trainingRun).pipe(
        switchMap((result) =>
          result === CsirtMuDialogResultEnum.CONFIRMED ? this.callApiToDeleteSandbox(trainingRun) : EMPTY
        )
      );
    } else {
      return this.callApiToDeleteSandbox(trainingRun);
    }
  }

  archive(trainingRun: TrainingRun): Observable<any> {
    return this.trainingRunApi.archive(trainingRun.id).pipe(
      tap(
        (_) => this.notificationService.emit('success', `Training run ${trainingRun.id} was archived`),
        (err) => this.errorHandler.emit(err, `Archiving training run ${trainingRun.id}`)
      ),
      switchMap((_) => this.getAll(this.lastTrainingInstanceId, this.lastPagination))
    );
  }

  protected refreshResource(): Observable<KypoPaginatedResource<TrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceApi
      .getAssociatedTrainingRuns(this.lastTrainingInstanceId, this.lastPagination)
      .pipe(tap({ error: (err) => this.onGetAllError() }));
  }

  protected onManualResourceRefresh(pagination: KypoRequestedPagination, ...params) {
    super.onManualResourceRefresh(pagination, ...params);
    this.lastTrainingInstanceId = params[0];
  }

  private displayDeleteSandboxDialog(trainingRun: TrainingRun): Observable<CsirtMuDialogResultEnum> {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Sandbox Instance',
        `Do you want to delete sandbox instance of player "${trainingRun?.player?.name}"?`,
        'Cancel',
        'Delete'
      ),
    });
    return dialogRef.afterClosed();
  }

  private callApiToDeleteSandbox(trainingRun: TrainingRun): Observable<KypoPaginatedResource<TrainingRun>> {
    let sandboxToDelete: SandboxInstance;
    return this.sandboxApi.getSandbox(trainingRun.sandboxInstanceId).pipe(
      tap((sandbox) => (sandboxToDelete = sandbox)),
      switchMap((_) => this.sandboxApi.unlockSandbox(sandboxToDelete.id, sandboxToDelete.lockId)),
      switchMap((_) => this.sauApi.createCleanupRequest(sandboxToDelete.allocationUnitId)),
      tap(
        (_) => this.notificationService.emit('success', 'Deleting of sandbox instance started'),
        (err) => this.errorHandler.emit(err, 'Deleting sandbox instance')
      ),
      switchMap((_) => this.getAll(trainingRun.trainingInstanceId, this.lastPagination))
    );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }
}
