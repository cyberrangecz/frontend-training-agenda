import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export abstract class AdaptiveInstanceSummaryService {
  hasStarted$: Observable<boolean>;
  protected trainingInstance: TrainingInstance;

  abstract init(ti: TrainingInstance): void;

  abstract showResults(): Observable<any>;
}
