import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  ADAPTIVE_DEFINITION_SELECTOR,
} from '@muni-kypo-crp/training-agenda';
import { AdaptiveDefinitionResolver } from './adaptive-definition-resolver.service';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class AdaptiveDefinitionBreadcrumbResolver implements Resolve<string> {
  constructor(private adaptiveDefinitionResolver: AdaptiveDefinitionResolver) {}

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(TRAINING_DEFINITION_NEW_PATH)) {
      return 'Create';
    } else if (route.paramMap.has(ADAPTIVE_DEFINITION_SELECTOR)) {
      const resolved = this.adaptiveDefinitionResolver.resolve(route, state) as Observable<TrainingDefinition>;
      return resolved.pipe(map((td) => (td ? this.getBreadcrumbFromDefinition(td, state) : '')));
    }
    return EMPTY;
  }

  private getBreadcrumbFromDefinition(trainingDefinition: TrainingDefinition, state: RouterStateSnapshot): string {
    return state.url.includes(TRAINING_DEFINITION_EDIT_PATH)
      ? `Edit ${trainingDefinition.title}`
      : trainingDefinition.title;
  }
}
