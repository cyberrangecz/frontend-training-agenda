import { DetectedForbiddenCommand, DetectionEventParticipant } from '@muni-kypo-crp/training-model';

/**
 * Class representing row of cheating detection table
 */
export class DetectionEventForbiddenCommandsRowAdapter extends DetectedForbiddenCommand {
  occurredAtFormatted: string;
  typeFormatted: string;
}
