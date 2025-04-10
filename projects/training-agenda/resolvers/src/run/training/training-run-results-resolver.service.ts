import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TrainingRunApi } from '@crczp/training-api';
import { TrainingRun } from '@crczp/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { TRAINING_RUN_SELECTOR, TrainingErrorHandler, TrainingNavigator } from '@crczp/training-agenda';

@Injectable()
export class TrainingRunResultsResolver {
    constructor(
        private api: TrainingRunApi,
        private errorHandler: TrainingErrorHandler,
        private navigator: TrainingNavigator,
        private router: Router,
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TrainingRun> | Promise<TrainingRun> | TrainingRun {
        if (route.paramMap.has(TRAINING_RUN_SELECTOR)) {
            const id = Number(route.paramMap.get(TRAINING_RUN_SELECTOR));
            return this.api.get(id).pipe(
                take(1),
                mergeMap((tr) => (tr ? of(tr) : this.navigateToOverview())),
                catchError((err) => {
                    this.errorHandler.emit(err, 'Training run results');
                    this.navigateToOverview();
                    return EMPTY;
                }),
            );
        }
        return this.navigateToOverview();
    }

    private navigateToOverview(): Observable<never> {
        this.router.navigate([this.navigator.toTrainingRunOverview()]);
        return EMPTY;
    }
}
