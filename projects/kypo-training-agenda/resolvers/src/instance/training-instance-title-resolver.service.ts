import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TrainingInstance } from 'kypo-training-model';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { TRAINING_INSTANCE_NEW_PATH, TRAINING_INSTANCE_PATH, TRAINING_INSTANCE_SELECTOR } from '@kypo/training-agenda';
import { TrainingInstanceResolver } from './training-instance-resolver.service';

@Injectable()
export class TrainingInstanceTitleResolver implements Resolve<string> {
  constructor(private trainingInstanceResolver: TrainingInstanceResolver) {}

  /**
   * Retrieves a specific resource title based on id provided in url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(`${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`)) {
      return 'Create Training Definition';
    } else if (route.paramMap.has(TRAINING_INSTANCE_SELECTOR)) {
      const resolved = this.trainingInstanceResolver.resolve(route, state) as Observable<TrainingInstance>;
      return resolved.pipe(
        take(1),
        mergeMap((ti) => (ti ? of(`Edit ${ti.title}`) : '')),
        catchError((err) => '')
      );
    }
    return '';
  }
}
