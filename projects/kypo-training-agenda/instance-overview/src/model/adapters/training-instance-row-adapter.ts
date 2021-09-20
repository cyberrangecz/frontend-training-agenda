import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export class TrainingInstanceRowAdapter extends TrainingInstance {
  startTimeFormatted: string;
  endTimeFormatted: string;
  tdTitle: string;
  poolTitle: string;
  expiresIn: string;
  poolSize: Observable<string[]>;
}
