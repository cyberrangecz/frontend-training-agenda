import { Injectable } from '@angular/core';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { TrainingInstanceApi, TrainingRunApi } from '@cyberrangecz-platform/training-api';
import { TrainingRun } from '@cyberrangecz-platform/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNotificationService } from '@cyberrangecz-platform/training-agenda';
import { TrainingAgendaContext } from '@cyberrangecz-platform/training-agenda/internal';
import { TrainingRunService } from './training-run.service';
import { SandboxAllocationUnitsApi, SandboxInstanceApi } from '@cyberrangecz-platform/sandbox-api';
import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { SandboxInstance } from '@cyberrangecz-platform/sandbox-model';

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
    private errorHandler: TrainingErrorHandler,
  ) {
    super(context.config.defaultPaginationSize, context.config.pollingPeriod);
  }

  /**
   * Gel all training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: OffsetPaginationEvent): Observable<PaginatedResource<TrainingRun>> {
    this.onManualResourceRefresh(pagination, trainingInstanceId);
    return this.trainingInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination).pipe(
      tap(
        (runs) => this.resourceSubject$.next(runs),
        () => this.onGetAllError(),
      ),
    );
  }

  delete(trainingRun: TrainingRun, localEnvironment: boolean): Observable<any> {
    return this.displayDeleteSandboxDialog(trainingRun).pipe(
      switchMap((result) => (result === SentinelDialogResultEnum.CONFIRMED ? of(result) : EMPTY)),
      switchMap(() => this.callApiToDeleteRun(trainingRun)),
      switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination)),
      switchMap(() => {
        if (localEnvironment) {
          return of();
        }
        return this.callApiToDeleteSandbox(trainingRun);
      }),
    );
  }

  private displayDeleteSandboxDialog(trainingRun: TrainingRun): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Sandbox Instance',
        `Do you want to delete sandbox instance and training run of player "${trainingRun?.player?.name}"?`,
        'Cancel',
        'Delete',
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

  protected onManualResourceRefresh(pagination: OffsetPaginationEvent, ...params: any[]): void {
    super.onManualResourceRefresh(pagination, ...params);
    this.lastTrainingInstanceId = params[0];
  }

  private callApiToDeleteSandbox(trainingRun: TrainingRun): Observable<any> {
    let sandboxToDelete: SandboxInstance;
    return this.sandboxApi.getSandbox(trainingRun.sandboxInstanceId).pipe(
      tap((sandbox) => (sandboxToDelete = sandbox)),
      switchMap(() => this.sandboxApi.unlockSandbox(sandboxToDelete.allocationUnitId)),
      switchMap(() => this.sauApi.createCleanupRequest(sandboxToDelete.allocationUnitId)),
      tap(
        () => this.notificationService.emit('success', 'Deleting of sandbox instance started'),
        (err) => this.errorHandler.emit(err, 'Deleting sandbox instance'),
      ),
    );
  }

  private callApiToDeleteRun(trainingRun: TrainingRun): Observable<any> {
    return this.trainingRunApi.delete(trainingRun.id, true).pipe(
      tap(
        () => this.notificationService.emit('success', 'Deleting of training run started'),
        (err) => this.errorHandler.emit(err, 'Deleting training run'),
      ),
    );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }
}
