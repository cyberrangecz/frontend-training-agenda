import { Injectable } from '@angular/core';
import { PaginatedResource, OffsetPaginationEvent, OffsetPaginatedElementsService } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 */
@Injectable()
export abstract class AdaptiveRunService extends OffsetPaginatedElementsService<TrainingRun> {
  /**
   * @param trainingInstanceId id of associated adaptive instance
   * @param pagination requested pagination
   */
  abstract getAll(
    trainingInstanceId: number,
    pagination: OffsetPaginationEvent
  ): Observable<PaginatedResource<TrainingRun>>;
}
