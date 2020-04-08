import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH, RESULTS_PATH,
  SUMMARY_PATH
} from '../../../model/client/default-paths';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TrainingInstance} from 'kypo-training-model';
import {TrainingInstanceResolver} from './training-instance-resolver.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TrainingInstanceDetailTitleResolver implements Resolve<string> {

  constructor(private trainingInstanceResolver: TrainingInstanceResolver) {
  }

  /**
   * Retrieves a specific resource title based on id provided in url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
   const resolved = this.trainingInstanceResolver.resolve(route, state) as Observable<TrainingInstance>;
   return resolved
     .pipe(
       take(1),
       mergeMap(ti => ti ? of(this.resolveTitle(ti, state)) : ''),
       catchError(err => '')
     );
  }

  private resolveTitle(ti: TrainingInstance, state: RouterStateSnapshot): string {
    if (state.url.includes(SUMMARY_PATH)) {
      return `Summary of ${ti.title}`;
    }
    if (state.url.includes(PROGRESS_PATH)) {
      return `Progress of ${ti.title}`;
    }
    if (state.url.includes(RESULTS_PATH)) {
      return `Results of ${ti.title}`;
    }
    if (state.url.includes(ACCESS_TOKEN_PATH)) {
      return `Access Token of ${ti.title}`;
    }
    return ti.title
  }
}
