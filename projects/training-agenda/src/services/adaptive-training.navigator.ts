import { CommonTrainingNavigator } from './training-default-navigator.service';
import { Injectable } from '@angular/core';
import {
    ADAPTIVE_DEFINITION_PATH,
    ADAPTIVE_INSTANCE_PATH,
    ADAPTIVE_RUN_PATH,
    SIMULATOR_PATH,
} from '../model/default-paths';
import { TrainingNavigator } from './training-navigator.service';

export abstract class AdaptiveTrainingNavigator extends TrainingNavigator {
    /**
     * Return route to adaptive simulator
     */
    abstract toSimulator(): string;
}

@Injectable()
export class AdaptiveTrainingDefaultNavigator extends CommonTrainingNavigator {
    constructor() {
        super(ADAPTIVE_DEFINITION_PATH, ADAPTIVE_INSTANCE_PATH, ADAPTIVE_RUN_PATH);
    }

    /**
     * Return route to adaptive simulator
     */
    toSimulator(): string {
        return `${ADAPTIVE_DEFINITION_PATH}/${SIMULATOR_PATH}`;
    }
}
