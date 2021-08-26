import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { TrainingInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../../model/events/training-instance-change-event';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceEditService } from './training-instance-edit.service';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class TrainingInstanceEditConcreteService extends TrainingInstanceEditService {
  private editedSnapshot: TrainingInstance;
  private selectedPool: number;
  private instanceValid: boolean;

  constructor(
    private trainingInstanceApi: TrainingInstanceApi,
    private sandboxInstanceApi: SandboxInstanceApi,
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
    this.instanceValid = changeEvent.isValid;
    this.editedSnapshot = changeEvent.trainingInstance;
  }

  /**
   * Handles change of pool selection
   * @param poolId pool ID of selected pool
   */
  poolSelectionChange(poolId: number): void {
    this.selectedPool = poolId;
    if (this.instanceValid) {
      this.saveDisabledSubject$.next(false);
    }
  }

  /**
   * Saves/creates training instance or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      return this.update();
    } else {
      if (this.selectedPool) {
        let instanceId: number;
        return this.create().pipe(
          tap((id) => (instanceId = id)),
          switchMap((id) => this.trainingInstanceApi.assignPool(id, this.selectedPool)),
          switchMap(() => from(this.router.navigate([this.navigator.toTrainingInstanceEdit(instanceId)])))
        );
      } else {
        return this.create().pipe(
          switchMap((id) => from(this.router.navigate([this.navigator.toTrainingInstanceEdit(id)])))
        );
      }
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
      const delay = 5;
      ti.startTime = new Date();
      ti.startTime.setMinutes(ti.startTime.getMinutes() + delay);
    }
    this.trainingInstanceSubject$.next(ti);
  }

  private setEditMode(trainingInstance: TrainingInstance) {
    this.editModeSubject$.next(trainingInstance !== null);
  }

  private create(): Observable<number> {
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

  private update(): Observable<number> {
    if (this.editedSnapshot) {
      if (this.selectedPool !== this.editedSnapshot.poolId) {
        return this.updateDefinition().pipe(switchMap(() => this.updatePool()));
      } else {
        return this.updateDefinition();
      }
    } else {
      return this.updatePool();
    }
  }

  private updateDefinition(): Observable<number> {
    return this.trainingInstanceApi.update(this.editedSnapshot).pipe(
      map(() => this.editedSnapshot.id),
      tap(
        () => {
          this.notificationService.emit('success', 'Training instance was successfully saved');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Editing training instance')
      )
    );
  }

  private updatePool() {
    return this.trainingInstanceApi.assignPool(this.trainingInstanceSubject$.getValue().id, this.selectedPool).pipe(
      tap(
        () => {
          this.notificationService.emit('success', 'Pool assign to training instance was successfully saved');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Editing training instance')
      )
    );
  }

  private onSaved() {
    this.editModeSubject$.next(true);
    this.saveDisabledSubject$.next(true);
    this.trainingInstanceSubject$.next(this.editedSnapshot);
    this.editedSnapshot = null;
  }
}
