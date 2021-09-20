import { Injectable } from '@angular/core';
import { PaginatedResource, RequestedPagination } from '@sentinel/common';
import { TrainingInstanceApi, TrainingRunApi } from '@muni-kypo-crp/training-api';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingNotificationService, TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunService } from './training-run.service';
import { SandboxAllocationUnitsApi, SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { SandboxInstance } from '@muni-kypo-crp/sandbox-model';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get training runs and poll in regular intervals.
 */
@Injectable()
export class TrainingRunConcreteService extends TrainingRunService {
  private lastTrainingInstanceId: number;

  constructor(
    private trainingInstanceApi: TrainingInstanceApi,
    private trainingRunApi: TrainingRunApi,
    private sauApi: SandboxAllocationUnitsApi,
    private sandboxApi: SandboxInstanceApi,
    private context: TrainingAgendaContext,
    private dialog: MatDialog,
    private notificationService: TrainingNotificationService,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize, context.config.pollingPeriod);
  }

  /**
   * Gel all training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRun>> {
    this.onManualResourceRefresh(pagination, trainingInstanceId);
    return this.trainingInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination).pipe(
      tap(
        (runs) => this.resourceSubject$.next(runs),
        () => this.onGetAllError()
      )
    );
  }

  delete(trainingRun: TrainingRun): Observable<any> {
    return this.displayDeleteSandboxDialog(trainingRun).pipe(
      switchMap((result) => (result === SentinelDialogResultEnum.CONFIRMED ? of(result) : EMPTY)),
      switchMap(() => this.callApiToDeleteRun(trainingRun)),
      switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination)),
      switchMap(() => this.callApiToDeleteSandbox(trainingRun))
    );
  }

  private displayDeleteSandboxDialog(trainingRun: TrainingRun): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Sandbox Instance',
        `Do you want to delete sandbox instance and training run of player "${trainingRun?.player?.name}"?`,
        'Cancel',
        'Delete'
      ),
    });
    return dialogRef.afterClosed();
  }

  protected refreshResource(): Observable<PaginatedResource<TrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceApi
      .getAssociatedTrainingRuns(this.lastTrainingInstanceId, this.lastPagination)
      .pipe(tap({ error: () => this.onGetAllError() }));
  }

  protected onManualResourceRefresh(pagination: RequestedPagination, ...params: any[]): void {
    super.onManualResourceRefresh(pagination, ...params);
    this.lastTrainingInstanceId = params[0];
  }

  private callApiToDeleteSandbox(trainingRun: TrainingRun): Observable<any> {
    let sandboxToDelete: SandboxInstance;
    return this.sandboxApi.getSandbox(trainingRun.sandboxInstanceId).pipe(
      tap((sandbox) => (sandboxToDelete = sandbox)),
      switchMap(() => this.sandboxApi.unlockSandbox(sandboxToDelete.id, sandboxToDelete.lockId)),
      switchMap(() => this.sauApi.createCleanupRequest(sandboxToDelete.allocationUnitId)),
      tap(
        () => this.notificationService.emit('success', 'Deleting of sandbox instance started'),
        (err) => this.errorHandler.emit(err, 'Deleting sandbox instance')
      )
    );
  }

  private callApiToDeleteRun(trainingRun: TrainingRun): Observable<any> {
    return this.trainingRunApi.delete(trainingRun.id, true).pipe(
      tap(
        () => this.notificationService.emit('success', 'Deleting of training run started'),
        (err) => this.errorHandler.emit(err, 'Deleting training run')
      )
    );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }
}
