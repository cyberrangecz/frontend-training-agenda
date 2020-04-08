import {Injectable} from '@angular/core';
import {concat, EMPTY, merge, Observable, Subject, timer} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoRequestedPagination} from 'kypo-common';
import {TrainingInstanceApi} from 'kypo-training-api';
import {retryWhen, switchMap, tap} from 'rxjs/operators';
import {TrainingInstance} from 'kypo-training-model';
import {PoolRequestApi, SandboxInstanceApi} from 'kypo-sandbox-api';
import {ActiveTrainingRunService} from './active-training-run.service';
import {TrainingRun} from 'kypo-training-model';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum,
} from 'csirt-mu-common';
import {MatDialog} from '@angular/material/dialog';
import {TrainingNotificationService} from '../../client/training-notification.service';
import {TrainingErrorHandler} from '../../client/training-error.handler';
import {TrainingAgendaContext} from '../../internal/training-agenda-context.service';
import {SandboxInstance} from 'kypo-sandbox-model';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get active training runs and poll in regular intervals.
 */
@Injectable()
export class ActiveTrainingRunConcreteService extends ActiveTrainingRunService {

  private lastPagination: KypoRequestedPagination;
  private retryPolling$: Subject<boolean> = new Subject();
  private trainingInstance: TrainingInstance;

  constructor(private trainingInstanceFacade: TrainingInstanceApi,
              private sandboxApi: SandboxInstanceApi,
              private requestApi: PoolRequestApi,
              private dialog: MatDialog,
              private context: TrainingAgendaContext,
              private notificationService: TrainingNotificationService,
              private errorHandler: TrainingErrorHandler) {
    super(context.config.defaultPaginationSize);
  }

  /**
   * Initiates polling for active training runs of passed training instance
   * @param trainingInstance which active training runs should be polled
   */
  startPolling(trainingInstance: TrainingInstance) {
    this.trainingInstance = trainingInstance;
    this.lastPagination = new KypoRequestedPagination(0, this.context.config.defaultPaginationSize, '', '');
    const poll$ = this.createPoll();
    this.resource$ = merge(poll$, this.resourceSubject$.asObservable());
  }

  /**
   * Gel all active training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which active training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<TrainingRun>> {
    this.onManualGetAll(pagination);
    return this.trainingInstanceFacade.getAssociatedTrainingRuns(trainingInstanceId, pagination)
      .pipe(
        tap( runs => {
            this.resourceSubject$.next(runs);
          },
          err => this.onGetAllError()
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
      return this.displayDeleteSandboxDialog(trainingRun)
        .pipe(
          switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToDeleteSandbox(trainingRun)
          : EMPTY
          )
        );
    } else {
      return this.callApiToDeleteSandbox(trainingRun);
    }

  }

  private displayDeleteSandboxDialog(trainingRun: TrainingRun): Observable<CsirtMuDialogResultEnum> {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Sandbox Instance',
        `Do you want to delete sandbox instance of player "${trainingRun?.player?.name}"?`,
        'Cancel',
        'Delete'
      )
    });
    return dialogRef.afterClosed();
  }

  private callApiToDeleteSandbox(trainingRun: TrainingRun): Observable<KypoPaginatedResource<TrainingRun>> {
    let sandboxToDelete: SandboxInstance;
    return this.sandboxApi.getSandbox(trainingRun.sandboxInstanceId)
      .pipe(
        tap(sandbox => sandboxToDelete = sandbox),
        switchMap(_ => this.sandboxApi.unlockSandbox(sandboxToDelete.id, sandboxToDelete.lockId)),
        switchMap(_ => this.requestApi.createCleanupRequest(sandboxToDelete.allocationUnitId)),
        tap(_ => this.notificationService.emit('success', 'Deleting of sandbox instance started'),
          err => this.errorHandler.emit(err, 'Deleting sandbox instance')
        ),
        switchMap(_ => this.getAll(trainingRun.trainingInstanceId, this.lastPagination))
      );
  }

  private repeatLastGetAllRequest(): Observable<KypoPaginatedResource<TrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade.getAssociatedTrainingRuns(this.trainingInstance.id, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError()})
      );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }

  private onManualGetAll(pagination: KypoRequestedPagination) {
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }

  private createPoll(): Observable<KypoPaginatedResource<TrainingRun>> {
    return timer(0, this.context.config.pollingPeriod)
      .pipe(
        switchMap( _ => this.repeatLastGetAllRequest()),
        retryWhen(_ => this.retryPolling$)
      );
  }
}
