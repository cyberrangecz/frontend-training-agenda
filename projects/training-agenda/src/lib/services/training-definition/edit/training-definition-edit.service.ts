import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {TrainingDefinition} from 'kypo-training-model';
import {filter} from 'rxjs/operators';
import {TrainingDefinitionChangeEvent} from '../../../model/events/training-definition-change-event';

export abstract class TrainingDefinitionEditService {
  protected trainingDefinitionSubject$: ReplaySubject<TrainingDefinition> = new ReplaySubject();
  /**
   * Currently edited training definition
   */
  trainingDefinition$: Observable<TrainingDefinition> = this.trainingDefinitionSubject$.asObservable()
    .pipe(filter(td => td !== undefined && td !== null));

  protected editModeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * Current mode (edit - true or create - false)
   */
  editMode$ = this.editModeSubject$.asObservable();

  protected saveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  /**
   * True if it is possible to save edited training definition in its current state, false otherwise
   */
  saveDisabled$ = this.saveDisabledSubject$.asObservable();

  /**
   * Sets training definition as currently edited
   * @param trainingDefinition to set as currently edited
   */
  abstract set(trainingDefinition: TrainingDefinition);

  /**
   * Saves/creates training definition based on edit mode or handles error.
   */
  abstract save(): Observable<any>;

  abstract createAndStay(): Observable<any>;

  /**
   * Updated saveDisabled$ and saved snapshot of edited training definition
   * @param changeEvent training definition object and its validity
   */
  abstract change(changeEvent: TrainingDefinitionChangeEvent);

}
