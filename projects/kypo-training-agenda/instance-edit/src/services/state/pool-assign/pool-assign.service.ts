import { PaginatedResource, PaginatedResourceService, RequestedPagination } from '@sentinel/common';
import { Pool } from '@muni-kypo-crp/sandbox-model';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class PoolAssignService extends PaginatedResourceService<Pool> {
  protected selectedSubject$: BehaviorSubject<Pool> = new BehaviorSubject(undefined);
  selected$: Observable<Pool> = this.selectedSubject$.asObservable();

  protected assignedPoolSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  assignedPool$: Observable<number> = this.assignedPoolSubject$.asObservable();

  abstract init(trainingInstance: TrainingInstance): void;

  abstract getAll(requestedPagination: RequestedPagination): Observable<PaginatedResource<Pool>>;

  abstract assign(trainingInstance: TrainingInstance): Observable<any>;

  abstract unassign(trainingInstance: TrainingInstance): Observable<any>;

  select(selected: Pool): void {
    this.selectedSubject$.next(selected);
  }

  unselect(): void {
    this.selectedSubject$.next(undefined);
  }
}
