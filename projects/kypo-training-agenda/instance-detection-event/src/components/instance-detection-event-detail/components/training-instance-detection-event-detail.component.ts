import { Component, Input } from '@angular/core';
import { OffsetPaginationEvent, SentinelBaseDirective } from '@sentinel/common';
import {
  AbstractDetectionEvent,
  AbstractDetectionEventTypeEnum,
  AnswerSimilarityDetectionEvent,
  DetectionEventParticipant,
  ForbiddenCommand,
  LocationSimilarityDetectionEvent,
  MinimalSolveTimeDetectionEvent,
  NoCommandsDetectionEvent,
  TimeProximityDetectionEvent,
} from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { take, takeWhile } from 'rxjs/operators';

/**
 * Main component of training instance detection event detail.
 */
@Component({
  selector: 'kypo-training-instance-detection-event-detail',
  templateUrl: './training-instance-detection-event-detail.component.html',
  styleUrls: ['./training-instance-detection-event-detail.component.css'],
})
export class TrainingInstanceDetectionEventDetailComponent extends SentinelBaseDirective {
  @Input() event: AbstractDetectionEvent;
  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'asc';

  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  detectionEvent$: Observable<AbstractDetectionEvent>;
  participants$: Observable<SentinelTable<DetectionEventParticipant>>;

  answerSimilarity: AnswerSimilarityDetectionEvent;
  locationSimilarity: LocationSimilarityDetectionEvent;
  timeProximity: TimeProximityDetectionEvent;
  minimalSolve: MinimalSolveTimeDetectionEvent;
  noCommands: NoCommandsDetectionEvent;

  constructor() {
    super();
  }

  /**
   * Resolves type of emitted event and calls appropriate handler
   * @param event action event emitted from table component
   */
  onTableAction(event: TableActionEvent<DetectionEventParticipant>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  ifAnswerSimilarity(): boolean {
    if (this.detectionEvent$ instanceof AnswerSimilarityDetectionEvent) {
      this.answerSimilarity = <AnswerSimilarityDetectionEvent>this.detectionEvent$;
      return true;
    }
    return false;
  }

  ifLocationProximity(): boolean {
    if (this.detectionEvent$ instanceof LocationSimilarityDetectionEvent) {
      this.locationSimilarity = <LocationSimilarityDetectionEvent>this.detectionEvent$;
      return true;
    }
    return false;
  }

  ifTimeProximity(): boolean {
    if (this.detectionEvent$ instanceof TimeProximityDetectionEvent) {
      this.timeProximity = <TimeProximityDetectionEvent>this.detectionEvent$;
      return true;
    }
    return false;
  }

  ifMinimalSolveTime(): boolean {
    if (this.detectionEvent$ instanceof MinimalSolveTimeDetectionEvent) {
      this.minimalSolve = <MinimalSolveTimeDetectionEvent>this.detectionEvent$;
      return true;
    }
    return false;
  }

  ifNoCommands(): boolean {
    if (this.detectionEvent$ instanceof NoCommandsDetectionEvent) {
      this.noCommands = <NoCommandsDetectionEvent>this.detectionEvent$;
      return true;
    }
    return false;
  }
}
