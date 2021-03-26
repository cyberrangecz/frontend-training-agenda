import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import {
  TRAINING_DEFINITION_NEW_PATH,
  ADAPTIVE_DEFINITION_PATH,
  ADAPTIVE_DEFINITION_SELECTOR,
} from '@muni-kypo-crp/training-agenda';
import { AdaptiveDefinitionResolver } from './adaptive-definition-resolver.service';

@Injectable()
export class AdaptiveDefinitionTitleResolver implements Resolve<string> {
  constructor(private adaptiveDefinitionResolver: AdaptiveDefinitionResolver) {}

  /**
   * Retrieves a specific resource title based on id provided in url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(`${ADAPTIVE_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`)) {
      return 'Create Adaptive Training Definition';
    } else if (route.paramMap.has(ADAPTIVE_DEFINITION_SELECTOR)) {
      const resolved = this.adaptiveDefinitionResolver.resolve(route, state) as Observable<TrainingDefinition>;
      return resolved.pipe(
        take(1),
        mergeMap((td) => (td ? of(`Edit ${td.title}`) : '')),
        catchError(() => '')
      );
    }
    return '';
  }
}
