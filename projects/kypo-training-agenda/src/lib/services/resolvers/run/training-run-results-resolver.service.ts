import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { TrainingRunApi } from 'kypo-training-api';
import { TrainingRun } from 'kypo-training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { TRAINING_RUN_SELECTOR } from '../../../model/client/default-paths';
import { TrainingErrorHandler } from '../../client/training-error.handler';
import { TrainingNavigator } from '../../client/training-navigator.service';

@Injectable()
export class TrainingRunResultsResolver implements Resolve<TrainingRun> {
  constructor(
    private api: TrainingRunApi,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TrainingRun> | Promise<TrainingRun> | TrainingRun {
    if (route.paramMap.has(TRAINING_RUN_SELECTOR)) {
      const id = Number(route.paramMap.get(TRAINING_RUN_SELECTOR));
      return this.api.get(id).pipe(
        take(1),
        mergeMap((tr) => (tr ? of(tr) : this.navigateToOverview())),
        catchError((err) => {
          this.errorHandler.emit(err, 'Training run results');
          this.navigateToOverview();
          return EMPTY;
        })
      );
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([this.navigator.toTrainingRunOverview()]);
    return EMPTY;
  }
}
