import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingDefinitionApi } from 'kypo-training-api';
import { TrainingDefinition } from 'kypo-training-model';
import { Kypo2AuthService } from 'kypo2-auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingDefinitionChangeEvent } from '../../../model/events/training-definition-change-event';
import { TrainingErrorHandler } from '../../client/training-error.handler.service';
import { TrainingNavigator } from '../../client/training-navigator.service';
import { TrainingNotificationService } from '../../client/training-notification.service';
import { TrainingDefinitionEditService } from './training-definition-edit.service';

/**
 * Service handling editing of training definition and related operations.
 * Serves as a layer between component and API service
 * Subscribe to trainingDefinition$ to receive latest data updates.
 */
@Injectable()
export class TrainingDefinitionEditConcreteService extends TrainingDefinitionEditService {
  private editedSnapshot: TrainingDefinition;

  constructor(
    private router: Router,
    private api: TrainingDefinitionApi,
    private authService: Kypo2AuthService,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private notificationService: TrainingNotificationService
  ) {
    super();
  }

  /**
   * Sets training definition as currently edited
   * @param trainingDefinition to set as currently edited
   */
  set(trainingDefinition: TrainingDefinition) {
    let td = trainingDefinition;
    this.setEditMode(td);
    if (td === null) {
      td = new TrainingDefinition();
    }
    this.trainingDefinitionSubject$.next(td);
  }

  /**
   * Saves/creates training definition based on edit mode or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      return this.update();
    } else {
      return this.create().pipe(map((_) => this.router.navigate([this.navigator.toTrainingDefinitionOverview()])));
    }
  }

  createAndStay(): Observable<any> {
    return this.create().pipe(map((id) => this.router.navigate([this.navigator.toTrainingDefinitionEdit(id)])));
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training definition
   * @param changeEvent training definition object and its validity
   */
  change(changeEvent: TrainingDefinitionChangeEvent) {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingDefinition;
  }

  private setEditMode(trainingDefinition: TrainingDefinition) {
    this.editModeSubject$.next(trainingDefinition !== null);
  }

  private update(): Observable<number> {
    return this.api.update(this.editedSnapshot).pipe(
      tap(
        (id) => {
          this.notificationService.emit('success', 'Changes were saved');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Editing training definition')
      )
    );
  }

  private create(): Observable<number> {
    return this.api.create(this.editedSnapshot).pipe(
      tap(
        (_) => {
          this.notificationService.emit('success', 'Training was created');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Creating new training definition')
      ),
      map((td) => td.id)
    );
  }

  private onSaved() {
    this.editModeSubject$.next(true);
    this.saveDisabledSubject$.next(true);
    this.trainingDefinitionSubject$.next(this.editedSnapshot);
    this.editedSnapshot = null;
  }
}
