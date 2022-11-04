import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CHEATING_DETECTION_CREATE_PATH, CHEATING_DETECTION_EVENTS_PATH } from '@muni-kypo-crp/training-agenda';

/**
 * Router breadcrumb title resolver
 */
@Injectable()
export class TrainingInstanceDetailCheatingBreadcrumbResolver implements Resolve<string> {
  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.includes(CHEATING_DETECTION_CREATE_PATH)) {
      return 'Create';
    }
    if (state.url.includes(CHEATING_DETECTION_EVENTS_PATH)) {
      return 'Detection-events';
    }
    return '';
  }
}
