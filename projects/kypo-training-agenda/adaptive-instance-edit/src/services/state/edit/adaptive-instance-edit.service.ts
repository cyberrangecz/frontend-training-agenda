import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AdaptiveInstanceChangeEvent } from '../../../models/events/adaptive-instance-change-event';
import { Pool, SandboxDefinition } from '@muni-kypo-crp/sandbox-model';
import { PaginatedResource, OffsetPaginationEvent, OffsetPagination } from '@sentinel/common';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to trainingInstance$ to receive latest data updates.
 */
export abstract class AdaptiveInstanceEditService {
  protected trainingInstanceSubject$: BehaviorSubject<TrainingInstance> = new BehaviorSubject(undefined);

  /**
   * Currently edited training instance
   */
  trainingInstance$: Observable<TrainingInstance> = this.trainingInstanceSubject$
    .asObservable()
    .pipe(filter((ti) => ti !== undefined && ti !== null));

  protected assignedPoolSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);

  assignedPool$: Observable<number> = this.assignedPoolSubject$.asObservable();

  protected assignedSandboxDefinitionSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);

  assignedSandboxDefinition$: Observable<number> = this.assignedSandboxDefinitionSubject$.asObservable();

  protected poolsSubject$: BehaviorSubject<PaginatedResource<Pool>> = new BehaviorSubject(this.initPools(999));

  pools$: Observable<PaginatedResource<Pool>> = this.poolsSubject$.asObservable();

  protected sandboxDefinitionsSubject$: BehaviorSubject<PaginatedResource<SandboxDefinition>> = new BehaviorSubject(
    this.initSandboxDefinitions(999)
  );

  sandboxDefinitions$: Observable<PaginatedResource<SandboxDefinition>> =
    this.sandboxDefinitionsSubject$.asObservable();

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

  protected sandboxDefinitionSaveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it is possible to save edited sandbox definition in its current state, false otherwise
   */
  sandboxDefinitionSaveDisabled$: Observable<boolean> = this.sandboxDefinitionSaveDisabledSubject$.asObservable();

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
  abstract change(changeEvent: AdaptiveInstanceChangeEvent): void;

  /**
   * Handles change of pool selection
   * @param poolId pool ID of selected pool
   */
  abstract poolSelectionChange(poolId: number): void;

  /**
   * Handles change of sandbox definition selection
   * @param sandboxDefinitionId ID of selected sandbox definition
   */
  abstract sandboxDefinitionSelectionChange(sandboxDefinitionId: number): void;

  abstract getAllPools(OffsetPaginationEvent: OffsetPaginationEvent): Observable<PaginatedResource<Pool>>;

  abstract getAllSandboxDefinitions(
    OffsetPaginationEvent: OffsetPaginationEvent
  ): Observable<PaginatedResource<SandboxDefinition>>;

  protected initPools(pageSize: number): PaginatedResource<Pool> {
    return new PaginatedResource([], new OffsetPagination(0, 0, pageSize, 0, 0));
  }

  protected initSandboxDefinitions(pageSize: number): PaginatedResource<SandboxDefinition> {
    return new PaginatedResource([], new OffsetPagination(0, 0, pageSize, 0, 0));
  }
}
