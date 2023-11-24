import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common/pagination';
import { OffsetPaginatedElementsService } from '@sentinel/common';
import { TrainingDefinitionInfo } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export abstract class TrainingDefinitionOrganizerSelectService extends OffsetPaginatedElementsService<TrainingDefinitionInfo> {
  /**
   * Gets paginated training definitions and updates related observables or handles error
   * @param pagination requested pagination
   * @param stateFilter filter (state attribute) which should be applied to requested training definitions
   */
  abstract getAll(
    pagination: OffsetPaginationEvent,
    stateFilter: string
  ): Observable<PaginatedResource<TrainingDefinitionInfo>>;
}
