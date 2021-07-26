import { PaginatedResourceService, PaginatedResource, RequestedPagination } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export abstract class AdaptiveInstanceOverviewService extends PaginatedResourceService<TrainingInstance> {
  abstract getAll(pagination: RequestedPagination, filter: string): Observable<PaginatedResource<TrainingInstance>>;

  abstract create(): Observable<any>;

  abstract edit(id: number): Observable<any>;

  abstract download(id: number): Observable<any>;

  abstract delete(trainingInstance: TrainingInstance): Observable<PaginatedResource<TrainingInstance>>;

  abstract getPoolState(poolId: number): Observable<string>;

  abstract getSshAccess(poolId: number): Observable<boolean>;
}
