import { Injectable } from '@angular/core';
import { SentinelFilter } from '@sentinel/common/filter';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common/pagination';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';
import { TrainingDefinitionInfo } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingDefinitionOrganizerSelectService } from './training-definition-organizer-select.service';

/**
 * Layer between component and API service
 */
@Injectable()
export class TrainingDefinitionOrganizerSelectConcreteService extends TrainingDefinitionOrganizerSelectService {
  constructor(
    private api: TrainingDefinitionApi,
    private context: TrainingAgendaContext,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize);
  }

  /**
   * Gets paginated training definitions and updates related observables or handles error
   * @param pagination requested pagination
   * @param stateFilter filter (state attribute) which should be applied to requested training definitions
   */
  getAll(
    pagination: OffsetPaginationEvent,
    stateFilter: string
  ): Observable<PaginatedResource<TrainingDefinitionInfo>> {
    this.hasErrorSubject$.next(false);
    this.isLoadingSubject$.next(true);
    return this.api.getAllForOrganizer(pagination, [new SentinelFilter('state', stateFilter)]).pipe(
      tap(
        (definitions) => {
          this.resourceSubject$.next(definitions);
          this.isLoadingSubject$.next(false);
        },
        (err) => {
          this.hasErrorSubject$.next(true);
          this.errorHandler.emit(err, `Fetching ${stateFilter} Training Definitions`);
          this.isLoadingSubject$.next(false);
        }
      )
    );
  }
}
