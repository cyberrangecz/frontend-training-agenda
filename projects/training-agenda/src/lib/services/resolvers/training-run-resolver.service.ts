import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take, tap} from 'rxjs/operators';
import {TrainingRunApi} from 'kypo-training-api';
import {AccessTrainingRunInfo} from 'kypo-training-model';
import {RunningTrainingRunService} from '../training-run/running/running-training-run.service';
import {TrainingErrorHandler} from '../client/training-error.handler';
import {TrainingNavigator} from '../client/training-navigator.service';
import {TRAINING_RUN_ACCESS_SELECTOR, TRAINING_RUN_SELECTOR} from '../../model/client/default-paths';


/**
 * Router data provider
 */
@Injectable()
export class AccessTrainingRunResolver implements Resolve<AccessTrainingRunInfo> {

  constructor(private api: TrainingRunApi,
              private runningTrainingRunService: RunningTrainingRunService,
              private errorHandler: TrainingErrorHandler,
              private navigator: TrainingNavigator,
              private router: Router) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccessTrainingRunInfo> | Promise<AccessTrainingRunInfo> | AccessTrainingRunInfo {
    if (route.paramMap.has(TRAINING_RUN_SELECTOR)) {
      return this.resume(route);
    } else if (route.paramMap.has(TRAINING_RUN_ACCESS_SELECTOR)) {
      return this.access(route);
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([this.navigator.toTrainingRunOverview()]);
    return EMPTY;
  }

  private resume(route: ActivatedRouteSnapshot): Observable<AccessTrainingRunInfo> {
    const id = Number(route.paramMap.get(TRAINING_RUN_SELECTOR));
    return this.api.resume(id)
      .pipe(
        take(1),
        tap(trainingRunInfo => this.runningTrainingRunService.init(trainingRunInfo)),
        mergeMap(tr => tr ? of(tr) : this.navigateToOverview()),
        catchError(err => {
          this.errorHandler.emit(err, 'Resuming training run');
          return this.navigateToOverview();
        })
      );
  }

  private access(route: ActivatedRouteSnapshot): Observable<AccessTrainingRunInfo> {
    const token = route.paramMap.get(TRAINING_RUN_ACCESS_SELECTOR);
    return this.api.access(token)
      .pipe(
        tap(trainingRunInfo => this.runningTrainingRunService.init(trainingRunInfo)),
        catchError(err => {
          this.errorHandler.emit(err, 'Accessing training run');
          return this.navigateToOverview();
        }),
      );
  }
}
