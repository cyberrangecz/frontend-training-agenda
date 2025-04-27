import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TrainingRunApi } from '@crczp/training-api';
import { AccessTrainingRunInfo } from '@crczp/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap, take, tap } from 'rxjs/operators';
import {
    TRAINING_RUN_ACCESS_SELECTOR,
    TRAINING_RUN_SELECTOR,
    TrainingErrorHandler,
    TrainingNavigator,
} from '@crczp/training-agenda';
import { RunningTrainingRunService } from '@crczp/training-agenda/run-detail';
import { MatDialog } from '@angular/material/dialog';
import { LobbyWaitingDialogComponent } from './lobby-waiting-dialog/lobby-waiting-dialog.component';

/**
 * Router data provider
 */
@Injectable()
export class AccessTrainingRunResolver {
    constructor(
        private api: TrainingRunApi,
        private runningTrainingRunService: RunningTrainingRunService,
        private errorHandler: TrainingErrorHandler,
        private navigator: TrainingNavigator,
        private router: Router,
        private dialog: MatDialog,
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
            tap((trainingRunInfo) => this.runningTrainingRunService.init(trainingRunInfo)),
            mergeMap((tr) => (tr ? of(tr) : this.navigateToOverview())),
            catchError((err) => {
                this.errorHandler.emit(err, 'Resuming training run');
                return this.navigateToOverview();
            }),
        );
    }

    private access(route: ActivatedRouteSnapshot): Observable<AccessTrainingRunInfo> {
        const token = route.paramMap.get(TRAINING_RUN_ACCESS_SELECTOR);
        return this.api.access(token).pipe(
            tap((trainingRunInfo) => this.runningTrainingRunService.init(trainingRunInfo)),
            catchError((err) => {
                if (err && err.status === 425 && token.endsWith('C')) {
                    this.navigateToOverview();
                    this.dialog.open(LobbyWaitingDialogComponent, {
                        data: token,
                    });
                    return EMPTY;
                }
                this.errorHandler.emit(err, 'Accessing training run');
                return this.navigateToOverview();
            }),
        );
    }
}
