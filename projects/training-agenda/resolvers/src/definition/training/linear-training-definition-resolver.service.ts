import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingDefinitionApi } from '@crczp/training-api';
import { LINEAR_DEFINITION_PATH, TrainingErrorHandler } from '@crczp/training-agenda';
import { CommonTrainingDefinitionResolver } from './common-training-definition-resolver.service';

/**
 * Router data provider
 */
@Injectable()
export class LinearTrainingDefinitionResolver extends CommonTrainingDefinitionResolver {
    constructor(api: TrainingDefinitionApi, errorHandler: TrainingErrorHandler, router: Router) {
        super(api, errorHandler, router, LINEAR_DEFINITION_PATH);
    }
}
