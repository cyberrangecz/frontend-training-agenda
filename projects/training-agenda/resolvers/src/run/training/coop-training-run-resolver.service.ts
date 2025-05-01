import { Router } from '@angular/router';
import { CoopTrainingRunApi } from '@crczp/training-api';
import { CoopTrainingNavigator, TrainingErrorHandler } from '@crczp/training-agenda';
import { RunningTrainingRunService } from '@crczp/training-agenda/run-detail';
import { MatDialog } from '@angular/material/dialog';
import { CommonTrainingRunResolver } from './common-training-run-resolver.service';
import { Injectable } from '@angular/core';

/**
 * Router data provider
 */
@Injectable()
export class CoopTrainingRunResolver extends CommonTrainingRunResolver {
    constructor(
        api: CoopTrainingRunApi,
        runningTrainingRunService: RunningTrainingRunService,
        errorHandler: TrainingErrorHandler,
        navigator: CoopTrainingNavigator,
        router: Router,
        dialog: MatDialog,
    ) {
        super(api, runningTrainingRunService, errorHandler, navigator, router, dialog);
    }
}
