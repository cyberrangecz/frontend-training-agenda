import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestedPagination, PaginatedResource } from '@sentinel/common';
import { PoolApi } from '@muni-kypo-crp/sandbox-api';
import { AdaptiveInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AdaptiveInstanceFilter } from '../../model/adapters/adaptive-instance-filter';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveInstanceOverviewService } from './adaptive-instance-overview.service';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AdaptiveInstanceOverviewConcreteService extends AdaptiveInstanceOverviewService {
  private lastPagination: RequestedPagination;
  private lastFilters: string;

  constructor(
    private adaptiveInstanceApi: AdaptiveInstanceApi,
    private dialog: MatDialog,
    private poolApi: PoolApi,
    private router: Router,
    private navigator: TrainingNavigator,
    private context: TrainingAgendaContext,
    private notificationService: TrainingNotificationService,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize);
  }

  getAll(pagination: RequestedPagination, filter: string = null): Observable<PaginatedResource<TrainingInstance>> {
    this.lastPagination = pagination;
    this.lastFilters = filter;
    this.hasErrorSubject$.next(false);
    const filters = filter ? [new AdaptiveInstanceFilter(filter)] : [];
    return this.adaptiveInstanceApi.getAll(pagination, filters).pipe(
      tap(
        (resource) => {
          this.resourceSubject$.next(resource);
        },
        (err) => {
          this.hasErrorSubject$.next(true);
          this.errorHandler.emit(err, 'Fetching training instances');
        }
      )
    );
  }

  create(): Observable<any> {
    return of(this.router.navigate([this.navigator.toNewAdaptiveInstance()]));
  }

  edit(id: number): Observable<any> {
    return of(this.router.navigate([this.navigator.toAdaptiveInstanceEdit(id)]));
  }

  download(id: number): Observable<any> {
    return this.adaptiveInstanceApi
      .archive(id)
      .pipe(tap({ error: (err) => this.errorHandler.emit(err, 'Downloading training instance') }));
  }

  delete(trainingInstance: TrainingInstance): Observable<PaginatedResource<TrainingInstance>> {
    return this.displayDialogToDelete(trainingInstance).pipe(
      switchMap((result) =>
        result === SentinelDialogResultEnum.CONFIRMED ? this.callApiToDelete(trainingInstance) : EMPTY
      )
    );
  }

  runs(id: number): Observable<any> {
    return of(this.router.navigate([this.navigator.toAdaptiveInstanceRuns(id)]));
  }

  token(id: number): Observable<any> {
    return of(this.router.navigate([this.navigator.toAdaptiveInstanceAccessToken(id)]));
  }

  progress(id: number): Observable<any> {
    return of(this.router.navigate([this.navigator.toAdaptiveInstanceProgress(id)]));
  }

  results(id: number): Observable<any> {
    return of(this.router.navigate([this.navigator.toAdaptiveInstanceResults(id)]));
  }

  getPoolSize(poolId: number): Observable<string> {
    return this.poolApi.getPool(poolId).pipe(
      map(
        (pool) => pool.maxSize.toString(),
        (err) => {
          this.hasErrorSubject$.next(true);
          this.errorHandler.emit(err, 'Fetching pool size');
          return EMPTY;
        }
      )
    );
  }

  getAvailableSandboxes(poolId: number): Observable<string> {
    return this.poolApi.getPoolsSandboxes(poolId).pipe(
      map(
        (sandboxes) => sandboxes.elements.filter((sandbox) => !sandbox.isLocked()).length.toString(),
        (err) => {
          this.hasErrorSubject$.next(true);
          this.errorHandler.emit(err, 'Fetching available sandboxes');
          return EMPTY;
        }
      )
    );
  }

  getSshAccess(poolId: number): Observable<boolean> {
    return this.poolApi.getManagementSshAccess(poolId).pipe(
      catchError((err) => {
        this.errorHandler.emit(err, 'Management SSH Access');
        return EMPTY;
      })
    );
  }

  private displayDialogToDelete(trainingInstance: TrainingInstance): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Training Instance',
        `Do you want to delete training instance "${trainingInstance.title}"?`,
        'Cancel',
        'Delete'
      ),
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(trainingInstance: TrainingInstance): Observable<PaginatedResource<TrainingInstance>> {
    return this.adaptiveInstanceApi.delete(trainingInstance.id).pipe(
      tap(() => this.notificationService.emit('success', 'Training instance was successfully deleted')),
      catchError((err) =>
        this.errorHandler
          .emit(err, 'Deleting training instance', 'Force')
          .pipe(switchMap((shouldForce) => (shouldForce ? this.forceDelete(trainingInstance.id) : EMPTY)))
      ),
      switchMap(() => this.getAll(this.lastPagination, this.lastFilters))
    );
  }

  private forceDelete(id: number): Observable<any> {
    return this.adaptiveInstanceApi.delete(id, true).pipe(
      tap(
        () => this.notificationService.emit('success', 'Training instance was successfully deleted'),
        (err) => this.errorHandler.emit(err, 'Force deleting training instance')
      )
    );
  }
}
