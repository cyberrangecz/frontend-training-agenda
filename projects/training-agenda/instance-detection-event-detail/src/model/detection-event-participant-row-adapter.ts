import { DetectionEventParticipant } from '@cyberrangecz-platform/training-model';

/**
 * Class representing row of cheating detection table
 */
export class DetectionEventParticipantRowAdapter extends DetectionEventParticipant {
  occurredAtFormatted: string;
  solvedInTimeFormatted: string;
}
