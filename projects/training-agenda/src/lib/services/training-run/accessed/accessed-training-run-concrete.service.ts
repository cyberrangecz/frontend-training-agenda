import {Injectable} from '@angular/core';
import {AccessedTrainingRunService} from './accessed-training-run.service';
import {KypoRequestedPagination} from 'kypo-common';
import {TrainingRunApi} from 'kypo-training-api';
import {from, Observable} from 'rxjs';
import {AccessedTrainingRun} from 'kypo-training-model';
import {tap} from 'rxjs/operators';
import {KypoPaginatedResource} from 'kypo-common';
import {Router} from '@angular/router';
import {TrainingErrorHandler} from '../../client/training-error.handler';
import {TrainingAgendaContext} from '../../internal/training-agenda-context.service';
import {TrainingNavigator} from '../../client/training-navigator.service';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {

  constructor(private api: TrainingRunApi,
              private router: Router,
              private context: TrainingAgendaContext,
              private navigator: TrainingNavigator,
              private errorHandler: TrainingErrorHandler) {
    super(context.config.defaultPaginationSize);
  }

  /**
   * Gets paginated accessed training runs and updates related observables or handles error.
   * @param pagination requested pagination info
   */
  getAll(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AccessedTrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.api.getAccessed(pagination).pipe(
      tap(trainingRuns => {
        this.resourceSubject$.next(trainingRuns);
      },
        err => {
          this.errorHandler.emit(err, 'Fetching training runs');
          this.hasErrorSubject$.next(true);
        })
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
