import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingInstanceApi } from '@crczp/training-api';
import { LINEAR_INSTANCE_PATH, LinearTrainingDefaultNavigator, TrainingErrorHandler } from '@crczp/training-agenda';
import { TrainingInstanceResolver } from './training-instance-resolver.service';

/**
 * Router data provider
 */
@Injectable()
export class LinearTrainingInstanceResolver extends TrainingInstanceResolver {
    constructor(
        api: TrainingInstanceApi,
        errorHandler: TrainingErrorHandler,
        navigator: LinearTrainingDefaultNavigator,
        router: Router,
    ) {
        super(api, errorHandler, router, LINEAR_INSTANCE_PATH, navigator.toTrainingInstanceOverview());
    }
}
