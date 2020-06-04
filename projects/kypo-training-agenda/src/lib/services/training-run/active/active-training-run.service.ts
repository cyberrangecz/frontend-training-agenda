import { Injectable } from '@angular/core';
import { KypoPaginatedResourcePollingService, KypoPaginatedResourceService } from 'kypo-common';
import { KypoPaginatedResource } from 'kypo-common';
import { KypoRequestedPagination } from 'kypo-common';
import { TrainingInstance } from 'kypo-training-model';
import { TrainingRun } from 'kypo-training-model';
import { Observable } from 'rxjs';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 */
@Injectable()
export abstract class ActiveTrainingRunService extends KypoPaginatedResourcePollingService<TrainingRun> {
  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(
    trainingInstanceId: number,
    pagination: KypoRequestedPagination
  ): Observable<KypoPaginatedResource<TrainingRun>>;

  /**
   * Deletes sandbox associated with active training run
   * @param trainingRun training run whose sandbox instance should be deleted
   */
  abstract deleteSandbox(trainingRun: TrainingRun): Observable<any>;

  /**
   * Archives training run
   * @param trainingRun training run which should be archived
   */
  abstract archive(trainingRun: TrainingRun): Observable<any>;
}
