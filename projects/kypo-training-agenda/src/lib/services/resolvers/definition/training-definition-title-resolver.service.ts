import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TrainingDefinitionApi} from 'kypo-training-api';
import {Observable, of} from 'rxjs';
import {
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_DEFINITION_SELECTOR
} from '../../../model/client/default-paths';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TrainingDefinitionResolver} from './training-definition-resolver.service';
import {TrainingDefinition} from 'kypo-training-model';
import {Injectable} from '@angular/core';

@Injectable()
export class TrainingDefinitionTitleResolver implements Resolve<string> {

  constructor(private trainingDefinitionResolver: TrainingDefinitionResolver) {
  }

  /**
   * Retrieves a specific resource title based on id provided in url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(`${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`)) {
      return 'Create Training Definition';
    } else if (route.paramMap.has(TRAINING_DEFINITION_SELECTOR)) {
      const resolved = this.trainingDefinitionResolver.resolve(route, state) as Observable<TrainingDefinition>;
      return resolved
        .pipe(
          take(1),
          mergeMap(td => td ? of(`Edit ${td.title}`) : ''),
          catchError(err => '')
        );
    }
    return '';
  }
}
