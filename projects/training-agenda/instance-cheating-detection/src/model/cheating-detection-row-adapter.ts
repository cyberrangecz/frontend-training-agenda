import { CheatingDetection } from '@cyberrangecz-platform/training-model';

/**
 * Class representing row of cheating detection table
 */
export class CheatingDetectionRowAdapter extends CheatingDetection {
  resultsFormatted: string;
  executeTimeFormatted: string;
  stages: string[];
}
