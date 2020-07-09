import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestedPagination, PaginatedResource } from '@sentinel/common';
import { TrainingRunApi } from 'kypo-training-api';
import { AccessedTrainingRun } from 'kypo-training-model';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '../../client/training-error.handler.service';
import { TrainingNavigator } from '../../client/training-navigator.service';
import { TrainingAgendaContext } from '../../internal/training-agenda-context.service';
import { AccessedTrainingRunService } from './accessed-training-run.service';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {
  constructor(
    private api: TrainingRunApi,
    private router: Router,
    private context: TrainingAgendaContext,
    private navigator: TrainingNavigator,
    private errorHandler: TrainingErrorHandler
  ) {
    super(context.config.defaultPaginationSize);
  }

  /**
   * Gets paginated accessed training runs and updates related observables or handles error.
   * @param pagination requested pagination info
   */
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.api.getAccessed(pagination).pipe(
      tap(
        (trainingRuns) => {
          this.resourceSubject$.next(trainingRuns);
        },
        (err) => {
          this.errorHandler.emit(err, 'Fetching training runs');
          this.hasErrorSubject$.next(true);
        }
      )
    );
  }

  /**
   * Resumes in already started training run or handles error.
   * @param id id of training run to resume
   */
  resume(id: number): Observable<any> {
    return from(this.router.navigate([this.navigator.toResumeTrainingRunGame(id)]));
  }

  access(token: string): Observable<any> {
    return from(this.router.navigate([this.navigator.toAccessTrainingRunGame(token)]));
  }

  results(id: number): Observable<any> {
    return from(this.router.navigate([this.navigator.toTrainingRunResult(id)]));
  }
}
