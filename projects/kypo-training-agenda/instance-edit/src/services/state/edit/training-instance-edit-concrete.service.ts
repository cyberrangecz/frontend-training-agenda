import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SandboxInstanceApi } from '@kypo/sandbox-api';
import { TrainingInstanceApi } from '@kypo/training-api';
import { TrainingInstance } from '@kypo/training-model';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../../model/events/training-instance-change-event';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@kypo/training-agenda';
import { TrainingInstanceEditService } from './training-instance-edit.service';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class TrainingInstanceEditConcreteService extends TrainingInstanceEditService {
  private editedSnapshot: TrainingInstance;

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
  change(changeEvent: TrainingInstanceChangeEvent) {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingInstance;
  }

  /**
   * Saves/creates training instance based on current edit mode or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      return this.update();
    } else {
      return this.create().pipe(
        switchMap((_) => from(this.router.navigate([this.navigator.toTrainingInstanceOverview()])))
      );
    }
  }

  createAndStay(): Observable<any> {
    return this.create().pipe(
      switchMap((id) => from(this.router.navigate([this.navigator.toTrainingInstanceEdit(id)])))
    );
  }

  /**
   * Sets training instance as currently edited
   * @param trainingInstance to set as currently edited
   */
  set(trainingInstance: TrainingInstance) {
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

  private update(): Observable<number> {
    return this.trainingInstanceApi.update(this.editedSnapshot).pipe(
      map((_) => this.editedSnapshot.id),
      tap(
        (_) => {
          this.notificationService.emit('success', 'Training instance was successfully saved');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Editing training instance')
      )
    );
  }

  private create(): Observable<number> {
    return this.trainingInstanceApi.create(this.editedSnapshot).pipe(
      map((ti) => ti.id),
      tap(
        (_) => {
          this.notificationService.emit('success', 'Training instance was created');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Creating training instance')
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
