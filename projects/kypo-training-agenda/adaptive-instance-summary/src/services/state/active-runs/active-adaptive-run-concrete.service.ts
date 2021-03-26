import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { PaginatedResource, RequestedPagination } from '@sentinel/common';
import { SandboxAllocationUnitsApi, SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { SandboxInstance } from '@muni-kypo-crp/sandbox-model';
import { AdaptiveInstanceApi, AdaptiveRunApi } from '@muni-kypo-crp/training-api';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingNotificationService, TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { ActiveAdaptiveRunService } from './active-adaptive-run.service';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get active training runs and poll in regular intervals.
 */
@Injectable()
export class ActiveAdaptiveRunConcreteService extends ActiveAdaptiveRunService {
  private lastTrainingInstanceId: number;

  constructor(
    private adaptiveInstanceApi: AdaptiveInstanceApi,
    private adaptiveRunApi: AdaptiveRunApi,
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
   * Gel all active adaptive runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which active adaptive runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRun>> {
    this.onManualResourceRefresh(pagination, trainingInstanceId);
    return this.adaptiveInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination).pipe(
      tap(
        (runs) => {
          this.resourceSubject$.next(runs);
        },
        () => this.onGetAllError()
      )
    );
  }

  /**
   * Delete sandbox instance associated with adaptive instance and refreshes list of all active adaptive runs
   * as a side effect or handles error
   * @param trainingRun adaptive run whose sandbox should be deleted
   */
  deleteSandbox(trainingRun: TrainingRun): Observable<any> {
    if (trainingRun.hasPlayer() && trainingRun.isRunning()) {
      console.log('hey1');
      return this.displayDeleteSandboxDialog(trainingRun).pipe(
        switchMap((result) =>
          result === SentinelDialogResultEnum.CONFIRMED ? this.callApiToDeleteSandbox(trainingRun) : EMPTY
        )
      );
    } else {
      console.log('hey2');
      return this.callApiToDeleteSandbox(trainingRun);
    }
  }

  archive(trainingRun: TrainingRun): Observable<any> {
    return this.adaptiveRunApi.archive(trainingRun.id).pipe(
      tap(
        () => this.notificationService.emit('success', `Training run ${trainingRun.id} was archived`),
        (err) => this.errorHandler.emit(err, `Archiving adaptive run ${trainingRun.id}`)
      ),
      switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination))
    );
  }

  protected refreshResource(): Observable<PaginatedResource<TrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.adaptiveInstanceApi
      .getAssociatedTrainingRuns(this.lastTrainingInstanceId, this.lastPagination)
      .pipe(tap({ error: () => this.onGetAllError() }));
  }

  protected onManualResourceRefresh(pagination: RequestedPagination, ...params: any[]): void {
    super.onManualResourceRefresh(pagination, ...params);
    this.lastTrainingInstanceId = params[0];
  }

  private displayDeleteSandboxDialog(trainingRun: TrainingRun): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Sandbox Instance',
        `Do you want to delete sandbox instance of player "${trainingRun?.player?.name}"?`,
        'Cancel',
        'Delete'
      ),
    });
    return dialogRef.afterClosed();
  }

  private callApiToDeleteSandbox(trainingRun: TrainingRun): Observable<PaginatedResource<TrainingRun>> {
    let sandboxToDelete: SandboxInstance;
    console.log(trainingRun);
    return this.sandboxApi.getSandbox(trainingRun.sandboxInstanceId).pipe(
      tap((sandbox) => (sandboxToDelete = sandbox)),
      switchMap(() => this.sandboxApi.unlockSandbox(sandboxToDelete.id, sandboxToDelete.lockId)),
      switchMap(() => this.sauApi.createCleanupRequest(sandboxToDelete.allocationUnitId)),
      tap(
        () => this.notificationService.emit('success', 'Deleting of sandbox instance started'),
        (err) => this.errorHandler.emit(err, 'Deleting sandbox instance')
      ),
      switchMap(() => this.getAll(trainingRun.trainingInstanceId, this.lastPagination))
    );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }
}
