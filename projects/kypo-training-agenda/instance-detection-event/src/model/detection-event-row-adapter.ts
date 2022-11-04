import { AbstractDetectionEvent } from '@muni-kypo-crp/training-model';

/**
 * Class representing row of cheating detection table
 */
export class DetectionEventRowAdapter extends AbstractDetectionEvent {
  detectedAtFormatted: string;
}
