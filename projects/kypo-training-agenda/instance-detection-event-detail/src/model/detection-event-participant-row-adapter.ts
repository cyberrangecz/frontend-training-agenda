import { DetectionEventParticipant } from '@muni-kypo-crp/training-model';

/**
 * Class representing row of cheating detection table
 */
export class DetectionEventParticipantRowAdapter extends DetectionEventParticipant {
  occurredAtFormatted: string;
  solvedInTimeFormatted: string;
}
