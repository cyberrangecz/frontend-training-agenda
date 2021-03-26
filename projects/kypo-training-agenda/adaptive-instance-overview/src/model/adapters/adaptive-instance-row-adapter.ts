import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export class AdaptiveInstanceRowAdapter extends TrainingInstance {
  date: string;
  tdTitle: string;
  poolTitle: string;
  poolSize: Observable<string>;
}
