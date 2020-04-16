import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KypoRequestedPagination } from 'kypo-common';
import { KypoPaginatedResource } from 'kypo-common';
import { PoolApi } from 'kypo-sandbox-api';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingInstance } from 'kypo-training-model';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TrainingInstanceFilter } from '../../model/filters/training-instance-filter';
import { TrainingErrorHandler } from '../client/training-error.handler';
import { TrainingNavigator } from '../client/training-navigator.service';
import { TrainingNotificationService } from '../client/training-notification.service';
import { TrainingAgendaContext } from '../internal/training-agenda-context.service';
import { TrainingInstanceOverviewService } from './training-instance-overview.service';

@Injectable()
export class TrainingInstanceOverviewConcreteService extends TrainingInstanceOverviewService {
  private lastPagination: KypoRequestedPagination;
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

  getAll(
    pagination: KypoRequestedPagination,
    filter: string = null
  ): Observable<KypoPaginatedResource<TrainingInstance>> {
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
    return this.trainingInstanceApi.archive(id);
  }

  delete(id: number): Observable<any> {
    return this.trainingInstanceApi.delete(id).pipe(
      tap(
        (_) => this.notificationService.emit('success', 'Training instance was successfully deleted'),
        (err) => this.errorHandler.emit(err, 'Deleting training instance')
      ),
      switchMap((_) => this.getAll(this.lastPagination, this.lastFilter))
    );
  }

  getPoolState(poolId: number): Observable<string> {
    return this.poolApi.getPool(poolId).pipe(map((pool) => `${pool.maxSize} (${pool.maxSize - pool.usedSize} free)`));
  }
}
