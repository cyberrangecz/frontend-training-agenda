import { Injectable } from '@angular/core';
import { LINEAR_DEFINITION_PATH, LINEAR_INSTANCE_PATH, RUN_PATH } from '../model/default-paths';
import { TrainingNavigator } from './training-navigator.service';
import { CommonTrainingNavigator } from './common-training-navigator.service';

export abstract class LinearTrainingNavigator extends TrainingNavigator {}

@Injectable()
export class LinearTrainingDefaultNavigator extends CommonTrainingNavigator implements LinearTrainingNavigator {
    constructor() {
        super(LINEAR_DEFINITION_PATH, LINEAR_INSTANCE_PATH, RUN_PATH);
    }
}
