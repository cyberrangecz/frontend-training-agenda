import { CommonTrainingNavigator } from './training-default-navigator.service';
import { Injectable } from '@angular/core';
import { LINEAR_DEFINITION_PATH, LINEAR_INSTANCE_PATH, LINEAR_RUN_PATH } from '../model/default-paths';

@Injectable()
export class LinearTrainingDefaultNavigator extends CommonTrainingNavigator {
    constructor() {
        super(LINEAR_DEFINITION_PATH, LINEAR_INSTANCE_PATH, LINEAR_RUN_PATH);
    }
}
