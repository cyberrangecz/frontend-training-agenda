import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AdaptiveRunApi } from '@cyberrangecz-platform/training-api';
import { AccessTrainingRunInfo } from '@cyberrangecz-platform/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap, take, tap } from 'rxjs/operators';
import {
  TRAINING_RUN_ACCESS_SELECTOR,
  TRAINING_RUN_SELECTOR,
  TrainingErrorHandler,
  TrainingNavigator,
} from '@cyberrangecz-platform/training-agenda';
import { RunningAdaptiveRunService } from '@cyberrangecz-platform/training-agenda/adaptive-run-detail';

@Injectable()
export class AccessAdaptiveRunResolver {
  constructor(
    private api: AdaptiveRunApi,
    private runningAdaptiveRunService: RunningAdaptiveRunService,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private router: Router,
  ) {}

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   */
  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AccessTrainingRunInfo> | Promise<AccessTrainingRunInfo> | AccessTrainingRunInfo {
    if (route.paramMap.has(TRAINING_RUN_SELECTOR)) {
      return this.resume(route);
    } else if (route.paramMap.has(TRAINING_RUN_ACCESS_SELECTOR)) {
      return this.access(route);
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([this.navigator.toTrainingRunOverview()]);
    return EMPTY;
  }

  private resume(route: ActivatedRouteSnapshot): Observable<AccessTrainingRunInfo> {
    const id = Number(route.paramMap.get(TRAINING_RUN_SELECTOR));
    return this.api.resume(id).pipe(
      take(1),
      tap((trainingRunInfo) => this.runningAdaptiveRunService.init(trainingRunInfo)),
      mergeMap((tr) => (tr ? of(tr) : this.navigateToOverview())),
      catchError((err) => {
        this.errorHandler.emit(err, 'Resuming adaptive run');
        return this.navigateToOverview();
      }),
    );
  }

  private access(route: ActivatedRouteSnapshot): Observable<AccessTrainingRunInfo> {
    const token = route.paramMap.get(TRAINING_RUN_ACCESS_SELECTOR);
    return this.api.access(token).pipe(
      tap((trainingRunInfo) => this.runningAdaptiveRunService.init(trainingRunInfo)),
      catchError((err) => {
        this.errorHandler.emit(err, 'Accessing adaptive run');
        return this.navigateToOverview();
      }),
    );
  }
}
