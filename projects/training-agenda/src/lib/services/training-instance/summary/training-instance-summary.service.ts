import {Observable} from 'rxjs';
import {TrainingInstance} from 'kypo-training-model';

export abstract class TrainingInstanceSummaryService {

  hasStarted$: Observable<boolean>;
  protected trainingInstance: TrainingInstance;

  abstract set(ti: TrainingInstance);

  abstract showProgress(): Observable<any>;

  abstract showResults(): Observable<any>;
}
