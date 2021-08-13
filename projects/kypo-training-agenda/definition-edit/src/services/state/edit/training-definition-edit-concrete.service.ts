import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';
import { Level, TrainingDefinition } from '@muni-kypo-crp/training-model';
import { concat, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingDefinitionChangeEvent } from '../../../model/events/training-definition-change-event';
import { TrainingNotificationService, TrainingNavigator, TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionEditService } from './training-definition-edit.service';
import { LevelEditService } from '../level/level-edit.service';

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
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private notificationService: TrainingNotificationService,
    private levelEditService: LevelEditService
  ) {
    super();
  }

  /**
   * Sets training definition as currently edited
   * @param trainingDefinition to set as currently edited
   */
  set(trainingDefinition: TrainingDefinition): void {
    let td = trainingDefinition;
    this.setEditMode(td);
    if (td === null) {
      td = new TrainingDefinition();
    }
    this.variantSandboxesSubject$.next(td.variantSandboxes === undefined ? false : td.variantSandboxes);
    this.trainingDefinitionSubject$.next(td);
  }

  /**
   * Saves/creates training definition based on edit mode or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      if (this.editedSnapshot) {
        // checks if TD was edited if not only levels are updated
        return concat(this.update(), this.levelEditService.saveUnsavedLevels());
      } else {
        return this.levelEditService.saveUnsavedLevels();
      }
    } else {
      return this.create().pipe(map((id) => this.router.navigate([this.navigator.toTrainingDefinitionEdit(id)])));
    }
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training definition
   * @param changeEvent training definition object and its validity
   */
  change(changeEvent: TrainingDefinitionChangeEvent): void {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingDefinition;
    if (this.variantSandboxesSubject$.value != this.editedSnapshot.variantSandboxes) {
      this.variantSandboxesSubject$.next(this.editedSnapshot.variantSandboxes);
    }
  }

  private setEditMode(trainingDefinition: TrainingDefinition) {
    this.editModeSubject$.next(trainingDefinition !== null);
  }

  private update(): Observable<number> {
    return this.api.update(this.editedSnapshot).pipe(
      tap(
        () => {
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
        () => {
          this.notificationService.emit('success', 'Training was created');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Creating training definition')
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
