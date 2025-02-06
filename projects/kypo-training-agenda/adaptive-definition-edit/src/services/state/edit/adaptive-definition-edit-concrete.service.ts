import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdaptiveDefinitionApiService } from '@cyberrangecz-platform/training-api';
import { TrainingDefinition } from '@cyberrangecz-platform/training-model';
import { concat, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingDefinitionChangeEvent } from '../../../model/events/training-definition-change-event';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@cyberrangecz-platform/training-agenda';
import { AdaptiveDefinitionEditService } from './adaptive-definition-edit.service';
import { PhaseEditService } from '../phase/phase-edit.service';

/**
 * Service handling editing of training definition and related operations.
 * Serves as a layer between component and API service
 * Subscribe to trainingDefinition$ to receive latest data updates.
 */
@Injectable()
export class AdaptiveDefinitionEditConcreteService extends AdaptiveDefinitionEditService {
  private editedSnapshot: TrainingDefinition;

  constructor(
    private router: Router,
    private api: AdaptiveDefinitionApiService,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private notificationService: TrainingNotificationService,
    private phaseEditService: PhaseEditService,
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
    this.trainingDefinitionSubject$.next(td);
  }

  /**
   * Saves/creates training definition based on edit mode or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      // checks if TD was edited if not only phases are updated
      if (this.editedSnapshot) {
        return concat(this.update(), this.phaseEditService.saveUnsavedPhases());
      } else {
        return concat(
          this.phaseEditService.saveUnsavedPhases(),
          this.api
            .get(this.trainingDefinitionSubject$.getValue().id, true)
            .pipe(tap((val) => this.trainingDefinitionSubject$.next(val))),
        );
      }
    } else {
      return this.create().pipe(map((id) => this.router.navigate([this.navigator.toAdaptiveDefinitionEdit(id)])));
    }
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training definition
   * @param changeEvent training definition object and its validity
   */
  change(changeEvent: TrainingDefinitionChangeEvent): void {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.definitionValidSubject$.next(changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingDefinition;
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
        (err) => this.errorHandler.emit(err, 'Editing training definition'),
      ),
    );
  }

  private create(): Observable<number> {
    return this.api.create(this.editedSnapshot).pipe(
      tap(
        () => {
          this.notificationService.emit('success', 'Training was created');
          this.onSaved();
        },
        (err) => this.errorHandler.emit(err, 'Creating training definition'),
      ),
      map((td) => td.id),
    );
  }

  private onSaved() {
    this.editModeSubject$.next(true);
    this.saveDisabledSubject$.next(true);
    this.trainingDefinitionSubject$.next(this.editedSnapshot);
    this.editedSnapshot = null;
  }
}
