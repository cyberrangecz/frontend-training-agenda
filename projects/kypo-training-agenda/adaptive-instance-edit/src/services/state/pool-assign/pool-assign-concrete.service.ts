import { Injectable } from '@angular/core';
import { PaginatedResource, RequestedPagination } from '@sentinel/common';
import { PoolApi } from '@muni-kypo-crp/sandbox-api';
import { Pool } from '@muni-kypo-crp/sandbox-model';
import { AdaptiveInstanceApi } from '@muni-kypo-crp/training-api';
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
    private trainingInstanceApi: AdaptiveInstanceApi,
    private poolApi: PoolApi
  ) {
    super();
  }

  init(trainingInstance: TrainingInstance): void {
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
        () => {
          this.isLoadingSubject$.next(false);
          this.hasErrorSubject$.next(true);
        }
      )
    );
  }
}
