import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestedPagination, PaginatedResource } from '@sentinel/common';
import { PoolApi } from 'kypo-sandbox-api';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingInstance } from 'kypo-training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TrainingInstanceFilter } from '../../model/filters/training-instance-filter';
import { TrainingErrorHandler } from '../client/training-error.handler.service';
import { TrainingNavigator } from '../client/training-navigator.service';
import { TrainingNotificationService } from '../client/training-notification.service';
import { TrainingAgendaContext } from '../internal/training-agenda-context.service';
import { TrainingInstanceOverviewService } from './training-instance-overview.service';

@Injectable()
export class TrainingInstanceOverviewConcreteService extends TrainingInstanceOverviewService {
  private lastPagination: RequestedPagination;
  private lastFilter: string;

  constructor(
    private trainingInstanceApi: TrainingInstanceApi,
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
    this.lastFilter = filter;
    this.hasErrorSubject$.next(false);
    const filters = filter ? [new TrainingInstanceFilter(filter)] : [];
    return this.trainingInstanceApi.getAll(pagination, filters).pipe(
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
    return of(this.router.navigate([this.navigator.toNewTrainingInstance()]));
  }

  edit(id: number): Observable<any> {
    return of(this.router.navigate([this.navigator.toTrainingInstanceEdit(id)]));
  }

  download(id: number): Observable<any> {
    return this.trainingInstanceApi
      .archive(id)
      .pipe(tap({ error: (err) => this.errorHandler.emit(err, 'Downloading training instance') }));
  }

  delete(id: number): Observable<any> {
    return this.trainingInstanceApi.delete(id).pipe(
      tap((_) => this.notificationService.emit('success', 'Training instance was successfully deleted')),
      catchError((err) =>
        this.errorHandler
          .emit(err, 'Deleting training instance', 'Force')
          .pipe(switchMap((shouldForce) => (shouldForce ? this.forceDelete(id) : EMPTY)))
      ),
      switchMap((_) => this.getAll(this.lastPagination, this.lastFilter))
    );
  }

  getPoolState(poolId: number): Observable<string> {
    return this.poolApi.getPool(poolId).pipe(map((pool) => `${pool.maxSize} (${pool.maxSize - pool.usedSize} free)`));
  }

  private forceDelete(id: number): Observable<any> {
    return this.trainingInstanceApi.delete(id, true).pipe(
      tap(
        (_) => this.notificationService.emit('success', 'Training instance was successfully deleted'),
        (err) => this.errorHandler.emit(err, 'Force deleting training instance')
      )
    );
  }
}
