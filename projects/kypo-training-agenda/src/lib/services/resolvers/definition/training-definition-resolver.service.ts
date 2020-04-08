import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TrainingDefinition} from 'kypo-training-model';
import {TrainingDefinitionApi} from 'kypo-training-api';
import {TrainingErrorHandler} from '../../client/training-error.handler';
import {
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_DEFINITION_SELECTOR
} from '../../../model/client/default-paths';

/**
 * Router data provider
 */
@Injectable()
export class TrainingDefinitionResolver implements Resolve<TrainingDefinition> {

  constructor(private api: TrainingDefinitionApi,
              private errorHandler: TrainingErrorHandler,
              private router: Router) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<TrainingDefinition> | Promise<TrainingDefinition> | TrainingDefinition {
    if (state.url.endsWith(`${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`)) {
      return null;
    } else if (route.paramMap.has(TRAINING_DEFINITION_SELECTOR)) {
      const id = Number(route.paramMap.get(TRAINING_DEFINITION_SELECTOR));
      return this.api.get(id, true)
        .pipe(
          take(1),
          mergeMap(td => td ? of(td) : this.navigateToNew()),
          catchError(err => {
            this.errorHandler.emit(err, 'Training definition resolver');
            this.navigateToNew();
            return EMPTY;
          })
        );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([TRAINING_DEFINITION_NEW_PATH]);
    return EMPTY;
  }
}
