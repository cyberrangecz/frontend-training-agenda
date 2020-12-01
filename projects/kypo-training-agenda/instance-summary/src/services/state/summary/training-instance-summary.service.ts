import { TrainingInstance } from '@kypo/training-model';
import { Observable } from 'rxjs';

export abstract class TrainingInstanceSummaryService {
  hasStarted$: Observable<boolean>;
  protected trainingInstance: TrainingInstance;

  abstract init(ti: TrainingInstance);

  abstract showProgress(): Observable<any>;

  abstract showResults(): Observable<any>;
}
