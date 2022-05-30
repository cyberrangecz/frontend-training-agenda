import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable, of, pipe } from 'rxjs';
import { catchError, mergeMap, take, tap } from 'rxjs/operators';
import {
  TrainingErrorHandler,
  TrainingNavigator,
  TRAINING_INSTANCE_NEW_PATH,
  ADAPTIVE_INSTANCE_PATH,
  ADAPTIVE_INSTANCE_SELECTOR,
} from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceApi } from '@muni-kypo-crp/training-api';

/**
 * Router data provider
 */
@Injectable()
export class AdaptiveInstanceResolver implements Resolve<TrainingInstance> {
  constructor(
    private api: AdaptiveInstanceApi,
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
    if (state.url.endsWith(`${ADAPTIVE_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`)) {
      return null;
    }
    if (route.paramMap.has(ADAPTIVE_INSTANCE_SELECTOR)) {
      const id = Number(route.paramMap.get(ADAPTIVE_INSTANCE_SELECTOR));
      return this.api.get(id).pipe(
        take(1),
        mergeMap((ti) => (ti ? of(ti) : this.navigateToNew())),
        catchError((err) => {
          this.errorHandler.emit(err, 'Adaptive instance resolver');
          this.navigateToNew();
          return EMPTY;
        })
      );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([this.navigator.toAdaptiveInstanceOverview()]);
    return EMPTY;
  }
}
