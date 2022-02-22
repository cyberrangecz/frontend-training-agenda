import { Injectable } from '@angular/core';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { PaginatedResource, OffsetPaginationEvent, OffsetPaginatedElementsPollingService } from '@sentinel/common';
import { Observable } from 'rxjs';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 */
@Injectable()
export abstract class TrainingRunService extends OffsetPaginatedElementsPollingService<TrainingRun> {
  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(
    trainingInstanceId: number,
    pagination: OffsetPaginationEvent
  ): Observable<PaginatedResource<TrainingRun>>;

  /**
   * Deletes sandbox and run itself
   * @param trainingRun training run whose sandbox instance should be deleted
   */
  abstract delete(trainingRun: TrainingRun): Observable<any>;
}
