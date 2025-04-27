import { TrainingNavigator } from './training-navigator.service';
import { CommonTrainingNavigator } from './common-training-navigator.service';
import { Injectable } from '@angular/core';
import {
    COOP_DEFINITION_PATH,
    COOP_INSTANCE_PATH,
    COOP_TRAINING_RUN_ACCESS_PATH,
    COOP_TRAINING_RUN_RESUME_PATH,
    LOBBY_MANAGEMENT_PATH,
    RUN_PATH,
    TRAINING_INSTANCE_DETAIL_PATH,
} from '../model/default-paths';

/**
 * Creates routes to navigate between components and pages of training agenda. Default implementation is provived,
 * but can be overridden by client if custom routes are desired
 */
export abstract class CoopTrainingNavigator extends TrainingNavigator {
    /**
     * Returns route to teams management page
     */
    public abstract toTeamsManagement(instanceId: number): string;
}

@Injectable()
export class CoopTrainingDefaultNavigator extends CommonTrainingNavigator implements CoopTrainingNavigator {
    constructor() {
        super(COOP_DEFINITION_PATH, COOP_INSTANCE_PATH, RUN_PATH);
    }

    /**
     * Returns route to management of teams
     * @param id id of the training instance
     */
    toTeamsManagement(id: number): string {
        return `${COOP_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_DETAIL_PATH}/${LOBBY_MANAGEMENT_PATH}`;
    }

    /**
     * Returns route to training run training page
     * @param id id of the training run
     */
    toResumeTrainingRun(id: number | string): string {
        return `${this.runBasePath}/${COOP_TRAINING_RUN_RESUME_PATH}/${id}`;
    }

    toAccessTrainingRun(token: string): string {
        return `${this.runBasePath}/${COOP_TRAINING_RUN_ACCESS_PATH}/${token}`;
    }
}
