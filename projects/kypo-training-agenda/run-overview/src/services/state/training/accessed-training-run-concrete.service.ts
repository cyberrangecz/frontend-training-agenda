import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestedPagination, PaginatedResource } from '@sentinel/common';
import { AdaptiveRunApi, TrainingRunApi } from '@muni-kypo-crp/training-api';
import { AccessedTrainingRun } from '@muni-kypo-crp/training-model';
import { from, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { AccessedTrainingRunService } from './accessed-training-run.service';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {
  constructor(
    private trainingApi: TrainingRunApi,
    private adaptiveApi: AdaptiveRunApi,
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
    return this.trainingApi.getAccessed(pagination).pipe(
      concatMap((trainingRuns) => this.getAllAdaptive(pagination, trainingRuns)),
      tap(
        (runs) => {
          this.resourceSubject$.next(runs);
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
  resumeLinear(id: number): Observable<any> {
    return from(this.router.navigate([this.navigator.toResumeTrainingRunGame(id)]));
  }

  resumeAdaptive(id: number): Observable<any> {
    return from(this.router.navigate([this.navigator.toResumeAdaptiveRunGame(id)]));
  }

  access(token: string): Observable<any> {
    return from(this.router.navigate([this.navigator.toAccessTrainingRunGame(token)]));
  }

  results(id: number): Observable<any> {
    return from(this.router.navigate([this.navigator.toTrainingRunResult(id)]));
  }

  private getAllAdaptive(
    pagination: RequestedPagination,
    trainingRuns: PaginatedResource<AccessedTrainingRun>
  ): Observable<PaginatedResource<AccessedTrainingRun>> {
    return this.adaptiveApi.getAccessed(pagination).pipe(
      map(
        (adaptiveRuns) => {
          trainingRuns.elements = [...trainingRuns.elements, ...adaptiveRuns.elements];
          return trainingRuns;
        },
        (err) => {
          this.errorHandler.emit(err, 'Fetching adaptive runs');
          this.hasErrorSubject$.next(true);
        }
      )
    );
  }
}
