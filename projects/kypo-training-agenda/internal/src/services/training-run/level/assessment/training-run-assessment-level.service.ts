import { Question } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export abstract class TrainingRunAssessmentLevelService {
  /**
   * Submit answers entered by trainee
   * @param answers answers entered by user
   */
  abstract submit(answers: Question[]): Observable<any>;
}
