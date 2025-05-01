import { Router } from '@angular/router';
import { LinearTrainingRunApi } from '@crczp/training-api';
import { LinearTrainingNavigator, TrainingErrorHandler } from '@crczp/training-agenda';
import { RunningTrainingRunService } from '@crczp/training-agenda/run-detail';
import { MatDialog } from '@angular/material/dialog';
import { CommonTrainingRunResolver } from './common-training-run-resolver.service';
import { Injectable } from '@angular/core';

/**
 * Router data provider
 */
@Injectable()
export class LinearTrainingRunResolver extends CommonTrainingRunResolver {
    constructor(
        api: LinearTrainingRunApi,
        runningTrainingRunService: RunningTrainingRunService,
        errorHandler: TrainingErrorHandler,
        navigator: LinearTrainingNavigator,
        router: Router,
        dialog: MatDialog,
    ) {
        super(api, runningTrainingRunService, errorHandler, navigator, router, dialog);
    }
}
