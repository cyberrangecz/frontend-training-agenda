import { TrainingInstance } from 'kypo-training-model';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../../model/events/training-instance-change-event';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to trainingInstance$ to receive latest data updates.
 */
export abstract class TrainingInstanceEditService {
  protected trainingInstanceSubject$: ReplaySubject<TrainingInstance> = new ReplaySubject();

  /**
   * Currently edited training instance
   */
  trainingInstance$: Observable<TrainingInstance> = this.trainingInstanceSubject$
    .asObservable()
    .pipe(filter((ti) => ti !== undefined && ti !== null));

  protected editModeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Current mode (edit - true or create - false)
   */
  editMode$: Observable<boolean> = this.editModeSubject$.asObservable();

  protected saveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it is possible to save edited training instance in its current state, false otherwise
   */
  saveDisabled$: Observable<boolean> = this.saveDisabledSubject$.asObservable();

  /**
   * Sets training instance as currently edited
   * @param trainingInstance to set as currently edited
   */
  abstract set(trainingInstance: TrainingInstance);

  /**
   * Saves changes in currently edited training instance
   */
  abstract save(): Observable<any>;

  abstract createAndStay(): Observable<any>;

  /**
   * Handles changes of edited training instance
   * @param changeEvent training instance object and its validity
   */
  abstract change(changeEvent: TrainingInstanceChangeEvent);
}
