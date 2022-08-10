import { Injectable } from '@angular/core';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { TrainingInstanceApi, TrainingRunApi } from '@muni-kypo-crp/training-api';
import { TrainingRun, TrainingRunInfo } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunService } from './training-run.service';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get training runs and poll in regular intervals.
 */
@Injectable()
export class TrainingRunConcreteService extends TrainingRunService {
  private lastTrainingInstanceId: number;

  constructor(
    private trainingInstanceApi: TrainingInstanceApi,
    private context: TrainingAgendaContext,
    private trainingRunApi: TrainingRunApi,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize);
  }

  /**
   * Get all training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: OffsetPaginationEvent): Observable<PaginatedResource<TrainingRun>> {
    return this.trainingInstanceApi.getAssociatedTrainingRuns(trainingInstanceId, pagination).pipe(
      tap(
        (runs) => {
          this.resourceSubject$.next(runs);
        },
        () => this.onGetAllError()
      )
    );
  }

  getInfo(trainingRunId: number): Observable<TrainingRunInfo[]> {
    return this.trainingRunApi.getInfo(trainingRunId).pipe(
      tap(
        (_) => _,
        () => this.hasErrorSubject$.next(true)
      )
    );
  }

  /**
   * Get all scores from a specific training instance
   * @param trainingInstanceId id of training instance
   */
  exportScore(trainingInstanceId: number): Observable<any> {
    return this.trainingInstanceApi
      .exportScore(trainingInstanceId)
      .pipe(tap({ error: (err) => this.errorHandler.emit(err, 'Downloading training instance scores') }));
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }
}
