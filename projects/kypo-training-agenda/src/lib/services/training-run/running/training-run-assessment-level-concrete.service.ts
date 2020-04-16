import { Injectable } from '@angular/core';
import { TrainingRunApi } from 'kypo-training-api';
import { Question } from 'kypo-training-model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '../../client/training-error.handler';
import { RunningTrainingRunService } from './running-training-run.service';
import { TrainingRunAssessmentLevelService } from './training-run-assessment-level.service';

/**
 * Handles events and actions specific for assessment level in training run
 */
@Injectable()
export class TrainingRunAssessmentLevelConcreteService extends TrainingRunAssessmentLevelService {
  constructor(
    private api: TrainingRunApi,
    private errorHandler: TrainingErrorHandler,
    private runningTrainingRunService: RunningTrainingRunService
  ) {
    super();
  }

  /**
   * Submit answers entered by trainee
   * @param answers answers entered by user
   */
  submit(answers: Question[]): Observable<any> {
    return this.api.submitAnswers(this.runningTrainingRunService.trainingRunId, answers).pipe(
      tap(
        (_) => _,
        (err) => this.errorHandler.emit(err, 'Submitting answers')
      ),
      switchMap((_) => this.runningTrainingRunService.next())
    );
  }
}
