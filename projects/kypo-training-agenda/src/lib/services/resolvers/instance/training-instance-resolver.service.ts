import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingInstance } from 'kypo-training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import {
  TRAINING_INSTANCE_NEW_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_INSTANCE_SELECTOR,
} from '../../../model/client/default-paths';
import { TrainingErrorHandler } from '../../client/training-error.handler';
import { TrainingNavigator } from '../../client/training-navigator.service';

/**
 * Router data provider
 */
@Injectable()
export class TrainingInstanceResolver implements Resolve<TrainingInstance> {
  constructor(
    private api: TrainingInstanceApi,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private router: Router
  ) {}

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TrainingInstance> | Promise<TrainingInstance> | TrainingInstance {
    if (state.url.endsWith(`${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`)) {
      return null;
    }
    if (route.paramMap.has(TRAINING_INSTANCE_SELECTOR)) {
      const id = Number(route.paramMap.get(TRAINING_INSTANCE_SELECTOR));
      return this.api.get(id).pipe(
        take(1),
        mergeMap((ti) => (ti ? of(ti) : this.navigateToNew())),
        catchError((err) => {
          this.errorHandler.emit(err, 'Training instance resolver');
          this.navigateToNew();
          return EMPTY;
        })
      );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([this.navigator.toTrainingInstanceOverview()]);
    return EMPTY;
  }
}
