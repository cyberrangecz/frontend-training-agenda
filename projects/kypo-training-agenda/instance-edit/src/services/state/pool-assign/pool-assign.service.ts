import { PaginatedResource, PaginatedResourceService, RequestedPagination } from '@sentinel/common';
import { Pool } from 'kypo-sandbox-model';
import { TrainingInstance } from 'kypo-training-model';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class PoolAssignService extends PaginatedResourceService<Pool> {
  protected selectedSubject$: BehaviorSubject<Pool> = new BehaviorSubject(undefined);
  selected$: Observable<Pool> = this.selectedSubject$.asObservable();

  protected assignedPoolSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  assignedPool$: Observable<number> = this.assignedPoolSubject$.asObservable();

  abstract init(trainingInstance: TrainingInstance);

  abstract getAll(requestedPagination: RequestedPagination): Observable<PaginatedResource<Pool>>;

  abstract assign(trainingInstance: TrainingInstance): Observable<any>;

  abstract unassign(trainingInstance: TrainingInstance): Observable<any>;

  select(selected: Pool) {
    this.selectedSubject$.next(selected);
  }

  unselect() {
    this.selectedSubject$.next(undefined);
  }
}
