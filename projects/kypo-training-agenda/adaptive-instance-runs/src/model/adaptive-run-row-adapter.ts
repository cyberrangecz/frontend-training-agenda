import { TrainingRun } from '@muni-kypo-crp/training-model';

/**
 * Class representing row of adaptive run table
 */
export class AdaptiveRunRowAdapter extends TrainingRun {
  playerName: string;
  startTimeFormatted: string;
  endTimeFormatted: string;
  duration: string;
}
