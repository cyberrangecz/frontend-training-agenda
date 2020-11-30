import { Injectable } from '@angular/core';
import { Question } from 'kypo-training-model';
import { Observable } from 'rxjs';
import { RunningTrainingRunService, TrainingRunAssessmentLevelService } from '@kypo/training-agenda/internal';

@Injectable()
/**
 * Mocks behavior of training run assessment level service connected to backend for designers preview purposes
 */
export class PreviewAssessmentLevelService extends TrainingRunAssessmentLevelService {
  constructor(private runningTrainingRunService: RunningTrainingRunService) {
    super();
  }

  submit(answers: Question[]): Observable<any> {
    return this.runningTrainingRunService.next();
  }
}
