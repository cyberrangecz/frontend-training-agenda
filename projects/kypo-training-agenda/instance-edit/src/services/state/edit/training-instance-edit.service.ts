import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../../model/events/training-instance-change-event';
import { PaginatedResource, RequestedPagination, SentinelPagination } from '@sentinel/common';
import { Pool } from '@muni-kypo-crp/sandbox-model';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to trainingInstance$ to receive latest data updates.
 */
export abstract class TrainingInstanceEditService {
  protected trainingInstanceSubject$: BehaviorSubject<TrainingInstance> = new BehaviorSubject(undefined);

  /**
   * Currently edited training instance
   */
  trainingInstance$: Observable<TrainingInstance> = this.trainingInstanceSubject$
    .asObservable()
    .pipe(filter((ti) => ti !== undefined && ti !== null));

  protected assignedPoolSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);

  assignedPool$: Observable<number> = this.assignedPoolSubject$.asObservable();

  protected poolsSubject$: BehaviorSubject<PaginatedResource<Pool>> = new BehaviorSubject(this.initSubject(10));

  pools$: Observable<PaginatedResource<Pool>> = this.poolsSubject$.asObservable();

  /**
   * Current mode (edit - true or create - false)
   */
  protected editModeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  editMode$: Observable<boolean> = this.editModeSubject$.asObservable();

  protected instanceValidSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it training instance is in valid state, false otherwise
   */
  instanceValid$ = this.instanceValidSubject$.asObservable();

  hasStarted$: Observable<boolean>;

  protected saveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it is possible to save edited training instance in its current state, false otherwise
   */
  saveDisabled$: Observable<boolean> = this.saveDisabledSubject$.asObservable();

  protected poolSaveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it is possible to save edited pool in its current state, false otherwise
   */
  poolSaveDisabled$: Observable<boolean> = this.poolSaveDisabledSubject$.asObservable();

  protected constructor() {
    this.hasStarted$ = timer(1).pipe(
      switchMap(() => this.trainingInstance$),
      map((ti) => ti?.hasStarted())
    );
  }

  /**
   * Sets training instance as currently edited
   * @param trainingInstance to set as currently edited
   */
  abstract set(trainingInstance: TrainingInstance): void;

  /**
   * Saves changes in currently edited training instance
   */
  abstract save(): Observable<any>;

  /**
   * Handles changes of edited training instance
   * @param changeEvent training instance object and its validity
   */
  abstract change(changeEvent: TrainingInstanceChangeEvent): void;

  /**
   * Handles change of pool selection
   * @param poolId pool ID of selected pool
   */
  abstract poolSelectionChange(poolId: number): void;

  abstract getAll(requestedPagination: RequestedPagination): Observable<PaginatedResource<Pool>>;

  abstract init(trainingInstance: TrainingInstance): void;

  protected initSubject(pageSize: number): PaginatedResource<Pool> {
    return new PaginatedResource([], new SentinelPagination(0, 0, pageSize, 0, 0));
  }
}
