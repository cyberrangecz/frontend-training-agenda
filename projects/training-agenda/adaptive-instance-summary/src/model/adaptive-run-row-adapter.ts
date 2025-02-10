import { TrainingRun } from '@cyberrangecz-platform/training-model';

/**
 * Class representing row of adaptive run table
 */
export class AdaptiveRunRowAdapter extends TrainingRun {
  playerName: string;
  startTimeFormatted: string;
  endTimeFormatted: string;
  duration: string;
}
