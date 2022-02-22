import { Injectable } from '@angular/core';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { AdaptiveInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveRunService } from './adaptive-run.service';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get training runs and poll in regular intervals.
 */
@Injectable()
export class AdaptiveRunConcreteService extends AdaptiveRunService {
  private lastTrainingInstanceId: number;

  constructor(private adaptiveInstanceApi: AdaptiveInstanceApi, private context: TrainingAgendaContext) {
    super(context.config.defaultPaginationSize);
  }

  /**
   * Gel all adaptive runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which adaptive runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: OffsetPaginationEvent): Observable<PaginatedResource<TrainingRun>> {
    return this.adaptiveInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination).pipe(
      tap(
        (runs) => {
          this.resourceSubject$.next(runs);
        },
        () => this.onGetAllError()
      )
    );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }
}
