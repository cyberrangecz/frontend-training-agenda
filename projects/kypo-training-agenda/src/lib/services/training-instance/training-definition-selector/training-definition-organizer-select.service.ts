import { KypoPaginatedResource, KypoPaginatedResourceService, KypoRequestedPagination } from 'kypo-common';
import { TrainingDefinitionInfo } from 'kypo-training-model';
import { Observable } from 'rxjs';

export abstract class TrainingDefinitionOrganizerSelectService extends KypoPaginatedResourceService<
  TrainingDefinitionInfo
> {
  /**
   * Gets paginated training definitions and updates related observables or handles error
   * @param pagination requested pagination
   * @param stateFilter filter (state attribute) which should be applied to requested training definitions
   */
  abstract getAll(
    pagination: KypoRequestedPagination,
    stateFilter: string
  ): Observable<KypoPaginatedResource<TrainingDefinitionInfo>>;
}
