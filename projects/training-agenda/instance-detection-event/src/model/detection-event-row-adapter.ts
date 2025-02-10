import { AbstractDetectionEvent } from '@cyberrangecz-platform/training-model';

/**
 * Class representing row of cheating detection table
 */
export class DetectionEventRowAdapter extends AbstractDetectionEvent {
  detectedAtFormatted: string;
  detectionEventTypeFormatted: string;
}
