import { Injectable } from '@angular/core';
import { PaginatedResource, PaginatedResourcePollingService, RequestedPagination } from '@sentinel/common';
import { TrainingRun } from 'kypo-training-model';
import { Observable } from 'rxjs';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 * Subscribe to archivedTrainingRuns$ to receive latest data updates.
 */
@Injectable()
export abstract class ArchivedTrainingRunService extends PaginatedResourcePollingService<TrainingRun> {
  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(
    trainingInstanceId: number,
    pagination?: RequestedPagination
  ): Observable<PaginatedResource<TrainingRun>>;

  /**
   * Deletes archived training run
   * @param id id of archived training run
   */
  abstract delete(id: number): Observable<any>;

  /**
   * Deletes archived training runs
   * @param idsToDelete ids of archived training runs
   */
  abstract deleteMultiple(idsToDelete: number[]): Observable<any>;
}
