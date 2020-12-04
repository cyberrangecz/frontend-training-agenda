import { Injectable } from '@angular/core';
import { PaginatedResource, RequestedPagination } from '@sentinel/common';
import { PoolApi } from '@muni-kypo-crp/sandbox-api';
import { Pool } from '@muni-kypo-crp/sandbox-model';
import { TrainingInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { PoolAssignService } from './pool-assign.service';

@Injectable()
export class PoolAssignConcreteService extends PoolAssignService {
  private lastPagination: RequestedPagination;

  constructor(
    private errorHandler: TrainingErrorHandler,
    private notificationService: TrainingNotificationService,
    private trainingInstanceApi: TrainingInstanceApi,
    private poolApi: PoolApi
  ) {
    super();
  }

  init(trainingInstance: TrainingInstance) {
    this.assignedPoolSubject$.next(trainingInstance.poolId);
  }

  getAll(requestedPagination: RequestedPagination): Observable<PaginatedResource<Pool>> {
    this.lastPagination = requestedPagination;
    this.isLoadingSubject$.next(true);
    this.hasErrorSubject$.next(false);
    return this.poolApi.getPools(requestedPagination).pipe(
      tap(
        (pools) => {
          this.resourceSubject$.next(pools);
          this.isLoadingSubject$.next(false);
        },
        (err) => {
          this.isLoadingSubject$.next(false);
          this.hasErrorSubject$.next(true);
        }
      )
    );
  }

  assign(trainingInstance: TrainingInstance): Observable<any> {
    const poolId = this.selectedSubject$.getValue().id;
    return this.trainingInstanceApi.assignPool(trainingInstance.id, poolId).pipe(
      tap(
        (_) => {
          this.notificationService.emit('success', `Pool ${poolId} was assigned`);
          this.assignedPoolSubject$.next(poolId);
        },
        (err) => this.errorHandler.emit(err, `Assigning pool ${poolId}`)
      )
    );
  }

  unassign(trainingInstance: TrainingInstance): Observable<any> {
    return this.trainingInstanceApi.unassignPool(trainingInstance.id).pipe(
      switchMap((_) => this.getAll(this.lastPagination)),
      tap(
        (_) => {
          this.notificationService.emit('success', `Pool was unassigned`);
          this.assignedPoolSubject$.next(undefined);
        },
        (err) => this.errorHandler.emit(err, `Unassigning pool`)
      )
    );
  }
}
