import { CheatingDetection } from '@muni-kypo-crp/training-model';

/**
 * Class representing row of cheating detection table
 */
export class CheatingDetectionRowAdapter extends CheatingDetection {
  resultsFormatted: string;
  executeTimeFormatted: string;
  methodsFormatted: string;
}
