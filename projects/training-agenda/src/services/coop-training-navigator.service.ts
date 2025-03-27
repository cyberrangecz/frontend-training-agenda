import { TrainingNavigator } from './training-navigator.service';
import { CommonTrainingNavigator } from './training-default-navigator.service';
import { Injectable } from '@angular/core';
import {
    COOP_DEFINITION_PATH,
    COOP_INSTANCE_PATH,
    COOP_INSTANCE_TEAM_MANAGEMENT_PATH,
    COOP_RUN_PATH,
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
        super(COOP_DEFINITION_PATH, COOP_INSTANCE_PATH, COOP_RUN_PATH);
    }

    /**
     * Returns route to management of teams
     * @param id id of the training instance
     */
    toTeamsManagement(id: number): string {
        return `${COOP_INSTANCE_PATH}/${id}/${COOP_INSTANCE_TEAM_MANAGEMENT_PATH}`;
    }
}
