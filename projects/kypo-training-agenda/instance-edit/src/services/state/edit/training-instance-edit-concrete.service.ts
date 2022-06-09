import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoolApi, SandboxDefinitionApi, SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { TrainingInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../../model/events/training-instance-change-event';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceEditService } from './training-instance-edit.service';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { Pool, SandboxDefinition } from '@muni-kypo-crp/sandbox-model';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class TrainingInstanceEditConcreteService extends TrainingInstanceEditService {
  private editedSnapshot: TrainingInstance;
  private instanceValid: boolean;
  private lastPagination: OffsetPaginationEvent;

  constructor(
    private trainingInstanceApi: TrainingInstanceApi,
    private sandboxInstanceApi: SandboxInstanceApi,
    private poolApi: PoolApi,
    private sandboxDefinitionApi: SandboxDefinitionApi,
    private router: Router,
    private navigator: TrainingNavigator,
    private errorHandler: TrainingErrorHandler,
    private notificationService: TrainingNotificationService
  ) {
    super();
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training instance
   * @param changeEvent training instance object and its validity
   */
  change(changeEvent: TrainingInstanceChangeEvent): void {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.instanceValidSubject$.next(changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingInstance;
    this.editedSnapshot.poolId = this.assignedPoolSubject$.getValue();
  }

  /**
   * Handles change of pool selection
   * @param poolId pool ID of selected pool
   */
  poolSelectionChange(poolId: number): void {
    this.poolSaveDisabledSubject$.next(false);
    if (this.instanceValid !== false) {
      if (this.editedSnapshot) {
        this.editedSnapshot.poolId = poolId;
      }
    }
    this.assignedPoolSubject$.next(poolId);
  }

  sandboxDefinitionSelectionChange(sandboxDefinitionId: number): void {
    this.sandboxDefinitionSaveDisabledSubject$.next(false);
    if (this.instanceValid !== false) {
      if (this.editedSnapshot) {
        this.editedSnapshot.sandboxDefinitionId = sandboxDefinitionId;
      }
    }
    this.assignedSandboxDefinitionSubject$.next(sandboxDefinitionId);
  }

  /**
   * Saves/creates training instance or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      return this.update();
    } else {
      return this.create().pipe(
        switchMap((id) => from(this.router.navigate([this.navigator.toTrainingInstanceEdit(id)])))
      );
    }
  }

  /**
   * Sets training instance as currently edited
   * @param trainingInstance to set as currently edited
   */
  set(trainingInstance: TrainingInstance): void {
    let ti = trainingInstance;
    this.setEditMode(trainingInstance);
    if (ti === null) {
      ti = new TrainingInstance();
      ti.backwardMode = true;
      this.instanceValidSubject$.next(false);
    }
    this.assignedPoolSubject$.next(ti.poolId);
    this.assignedSandboxDefinitionSubject$.next(ti.sandboxDefinitionId);
    this.trainingInstanceSubject$.next(ti);
  }

  getAllPools(offsetPaginationEvent: OffsetPaginationEvent): Observable<PaginatedResource<Pool>> {
    this.lastPagination = offsetPaginationEvent;
    this.lastPagination.size = Number.MAX_SAFE_INTEGER;
    return this.poolApi.getPools(offsetPaginationEvent).pipe(
      tap(
        (pools) => {
          this.poolsSubject$.next(pools);
        },
        (err) => this.errorHandler.emit(err, 'Fetching available pools')
      )
    );
  }

  getAllSandboxDefinitions(
    offsetPaginationEvent: OffsetPaginationEvent
  ): Observable<PaginatedResource<SandboxDefinition>> {
    this.lastPagination = offsetPaginationEvent;
    this.lastPagination.size = Number.MAX_SAFE_INTEGER;
    return this.sandboxDefinitionApi.getAll(offsetPaginationEvent).pipe(
      tap(
        (sandboxDefinitions) => {
          this.sandboxDefinitionsSubject$.next(sandboxDefinitions);
        },
        (err) => this.errorHandler.emit(err, 'Fetching available sandbox definitions')
      )
    );
  }

  private setEditMode(trainingInstance: TrainingInstance) {
    this.editModeSubject$.next(trainingInstance !== null);
  }

  private create(): Observable<number> {
    if (this.editedSnapshot) {
      if (!this.editedSnapshot.startTime) this.editedSnapshot.startTime = new Date();
      if (this.editedSnapshot.localEnvironment) {
        this.assignedPoolSubject$.next(null);
        this.editedSnapshot.poolId = null;
      } else {
        this.editedSnapshot.sandboxDefinitionId = null;
        this.assignedSandboxDefinitionSubject$.next(null);
      }
    }
    return this.trainingInstanceApi.create(this.editedSnapshot).pipe(
      map((ti) => ti.id),
      tap(
        () => {
          this.notificationService.emit('success', 'Training instance was created');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Creating training instance')
      )
    );
  }

  private update(): Observable<any> {
    if (!this.editedSnapshot) {
      this.editedSnapshot = this.trainingInstanceSubject$.getValue();
    }
    if (this.editedSnapshot.localEnvironment) {
      this.assignedPoolSubject$.next(null);
    } else {
      this.assignedSandboxDefinitionSubject$.next(null);
    }
    this.editedSnapshot.poolId = this.assignedPoolSubject$.getValue();
    this.editedSnapshot.sandboxDefinitionId = this.assignedSandboxDefinitionSubject$.getValue();
    const pagination = new OffsetPaginationEvent(0, 10, '', '');
    this.saveDisabledSubject$.next(true);
    this.poolSaveDisabledSubject$.next(true);
    this.sandboxDefinitionSaveDisabledSubject$.next(true);
    return this.trainingInstanceApi.update(this.editedSnapshot).pipe(
      switchMap(() => this.getAllPools(pagination)),
      switchMap(() => this.getAllSandboxDefinitions(pagination)),
      tap(
        () => {
          this.notificationService.emit('success', 'Training instance was successfully saved');
          this.onSaved();
        },
        (err) => {
          this.poolSaveDisabledSubject$.next(false);
          this.sandboxDefinitionSaveDisabledSubject$.next(false);
          this.saveDisabledSubject$.next(false);
          this.errorHandler.emit(err, 'Editing training instance');
        }
      )
    );
  }

  private onSaved() {
    this.editModeSubject$.next(true);
    this.saveDisabledSubject$.next(true);
    this.poolSaveDisabledSubject$.next(true);
    this.sandboxDefinitionSaveDisabledSubject$.next(true);
    this.trainingInstanceSubject$.next(this.editedSnapshot);
    this.assignedPoolSubject$.next(this.editedSnapshot.poolId);
    this.assignedSandboxDefinitionSubject$.next(this.editedSnapshot.sandboxDefinitionId);
    this.editedSnapshot = null;
  }
}
