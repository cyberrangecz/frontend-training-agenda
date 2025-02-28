import { TrainingRun } from '@crczp/training-model';

/**
 * Class representing row of training run table
 */
export class TrainingRunRowAdapter extends TrainingRun {
    playerName: string;
    playerEmail: string;
    startTimeFormatted: string;
    endTimeFormatted: string;
    duration: string;
}
