import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { PaginatedResource, RequestedPagination } from '@sentinel/common';
import { TrainingRunApi } from '@muni-kypo-crp/training-api';
import { TrainingInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { ArchivedTrainingRunService } from './archived-training-run.service';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get archived training runs and poll in regular intervals.
 */
@Injectable()
export class ArchivedTrainingRunConcreteService extends ArchivedTrainingRunService {
  private lastTrainingInstanceId: number;

  constructor(
    private trainingRunApi: TrainingRunApi,
    private trainingInstanceApi: TrainingInstanceApi,
    private dialog: MatDialog,
    private context: TrainingAgendaContext,
    private notificationService: TrainingNotificationService,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize, context.config.pollingPeriod);
  }

  /**
   * Gel all archived training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which archived training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRun>> {
    this.onManualResourceRefresh(pagination, trainingInstanceId);
    return this.trainingInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination, false).pipe(
      tap(
        (runs) => {
          this.resourceSubject$.next(runs);
        },
        (err) => this.onGetAllError()
      )
    );
  }

  /**
   * Displays dialog to confirm deleting training run and refreshes list of all archived training runs
   * as a side effect or handles error
   * @param id of archived training run to delete
   */
  delete(id: number): Observable<PaginatedResource<TrainingRun>> {
    return this.displayDialogToDelete().pipe(
      switchMap((result) => (result === SentinelDialogResultEnum.CONFIRMED ? this.callApiToDelete(id) : EMPTY))
    );
  }

  /**
   * Displays dialog to confirm deleting selected archived training runs and refreshes list of all archived training runs
   * as a side effect or handles error
   * @param idsToDelete ids of archived training run to delete
   */
  deleteMultiple(idsToDelete: number[]): Observable<PaginatedResource<TrainingRun>> {
    return this.displayDialogToDelete(true).pipe(
      switchMap((result) =>
        result === SentinelDialogResultEnum.CONFIRMED ? this.callApiToDeleteMultiple(idsToDelete) : EMPTY
      )
    );
  }

  protected refreshResource(): Observable<PaginatedResource<TrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceApi
      .getAssociatedTrainingRuns(this.lastTrainingInstanceId, this.lastPagination, false)
      .pipe(tap({ error: (err) => this.onGetAllError() }));
  }

  protected onManualResourceRefresh(pagination: RequestedPagination, ...params) {
    super.onManualResourceRefresh(pagination, ...params);
    this.lastTrainingInstanceId = params[0];
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }

  private displayDialogToDelete(multiple = false): Observable<SentinelDialogResultEnum> {
    const title = multiple ? 'Delete Training Runs' : 'Delete Training Run';
    const message = multiple
      ? `Do you want to delete the training run?`
      : 'Do you want to delete selected training runs?';

    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(title, message, 'Cancel', 'Delete'),
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(id: number): Observable<PaginatedResource<TrainingRun>> {
    return this.trainingRunApi.delete(id).pipe(
      tap({
        error: (err) => this.errorHandler.emit(err, 'Deleting training run'),
      }),
      switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination))
    );
  }

  private callApiToDeleteMultiple(idsToDelete: number[]): Observable<PaginatedResource<TrainingRun>> {
    return this.trainingRunApi.deleteMultiple(idsToDelete).pipe(
      tap({
        error: (err) => this.errorHandler.emit(err, 'Deleting training runs'),
      }),
      switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination))
    );
  }
}
