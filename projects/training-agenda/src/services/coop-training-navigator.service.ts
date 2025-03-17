import { TrainingNavigator } from '@crczp/training-agenda';

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
