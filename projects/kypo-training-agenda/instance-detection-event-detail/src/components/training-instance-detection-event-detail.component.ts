import { Component, Input, OnInit } from '@angular/core';
import { OffsetPaginationEvent, SentinelBaseDirective, SentinelDateTimeFormatPipe } from '@sentinel/common';
import {
  AbstractDetectionEvent,
  AbstractDetectionEventTypeEnum,
  AnswerSimilarityDetectionEvent,
  DetectionEventParticipant,
  ForbiddenCommandsDetectionEvent,
  LocationSimilarityDetectionEvent,
  MinimalSolveTimeDetectionEvent,
  NoCommandsDetectionEvent,
  TimeProximityDetectionEvent,
} from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { map, take, takeWhile } from 'rxjs/operators';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { DetectionEventParticipantTable } from '../model/detection-event-participant-table';
import { DetectionEventParticipantService } from '../services/participant/detection-event-participant.service';
import { DetectionEventService } from '../services/detection-event/detection-event.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Main component of training instance detection event detail.
 */
@Component({
  selector: 'kypo-training-instance-detection-event-detail',
  templateUrl: './training-instance-detection-event-detail.component.html',
  styleUrls: ['./training-instance-detection-event-detail.component.css'],
})
export class TrainingInstanceDetectionEventDetailComponent extends SentinelBaseDirective implements OnInit {
  @Input() event: AbstractDetectionEvent;
  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'asc';

  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  detectionEvent$: Observable<AbstractDetectionEvent>;
  participants$: Observable<SentinelTable<DetectionEventParticipant>>;

  answerSimilarityEvent$: Observable<AnswerSimilarityDetectionEvent>;
  locationSimilarityEvent$: Observable<LocationSimilarityDetectionEvent>;
  timeProximityEvent$: Observable<TimeProximityDetectionEvent>;
  minimalSolveTimeEvent$: Observable<MinimalSolveTimeDetectionEvent>;
  noCommandsEvent$: Observable<NoCommandsDetectionEvent>;
  forbiddenCommandsEvent$: Observable<ForbiddenCommandsDetectionEvent>;
  eventId: number;
  detectionRunAt: Date;
  detectionRunAtFormatted: string;
  eventType: AbstractDetectionEventTypeEnum;
  eventTypeFormatted: string;

  constructor(
    private detectionEventService: DetectionEventService,
    private detectionEventParticipantService: DetectionEventParticipantService,
    private paginationService: PaginationService,
    private navigator: TrainingNavigator,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.eventId = Number(this.activeRoute.snapshot.paramMap.get('eventId'));
    this.detectionEvent$ = this.detectionEventService.get(this.eventId);
    this.detectionEvent$.subscribe((event) => {
      this.detectionRunAt = event.detectedAt;
      this.eventType = event.detectionEventType;
      this.populateEventData();
    });
    this.initTable();
  }

  populateEventData(): void {
    switch (this.eventType) {
      case AbstractDetectionEventTypeEnum.Answer_similarity:
        this.eventTypeFormatted = 'Answer similarity';
        this.answerSimilarityEvent$ = this.detectionEventService.getAnswerSimilarityEventById(this.eventId);
        break;
      case AbstractDetectionEventTypeEnum.Location_similarity:
        this.eventTypeFormatted = 'Location similarity';
        this.locationSimilarityEvent$ = this.detectionEventService.getLocationSimilarityEventById(this.eventId);
        break;
      case AbstractDetectionEventTypeEnum.Time_proximity:
        this.eventTypeFormatted = 'Time proximity';
        this.timeProximityEvent$ = this.detectionEventService.getTimeProximityEventById(this.eventId);
        break;
      case AbstractDetectionEventTypeEnum.Minimal_solve_time:
        this.eventTypeFormatted = 'Minimal solve time';
        this.minimalSolveTimeEvent$ = this.detectionEventService.getMinimalSolveTimeEventById(this.eventId);
        break;
      case AbstractDetectionEventTypeEnum.No_commands:
        this.eventTypeFormatted = 'No commands';
        this.noCommandsEvent$ = this.detectionEventService.getNoCommandsEventById(this.eventId);
        break;
      case AbstractDetectionEventTypeEnum.Forbidden_commands:
        this.eventTypeFormatted = 'Forbidden commands';
        this.forbiddenCommandsEvent$ = this.detectionEventService.getForbiddenCommandsEventById(this.eventId);
        break;
      default:
        this.eventTypeFormatted = 'Undefined';
    }
  }
  detectionRunTime(): string {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    return `${datePipe.transform(this.detectionRunAt)}`;
  }
  /**
   * Resolves type of emitted event and calls appropriate handler
   * @param event action event emitted from table component
   */
  onTableAction(event: TableActionEvent<DetectionEventParticipant>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  private initTable() {
    this.hasError$ = this.detectionEventParticipantService.hasError$;
    this.isLoading$ = this.detectionEventParticipantService.isLoading$;
    this.participants$ = this.detectionEventParticipantService.resource$.pipe(
      map((resource) => new DetectionEventParticipantTable(resource))
    );
    const initialPagination = new OffsetPaginationEvent(
      0,
      this.paginationService.getPagination(),
      this.INIT_SORT_NAME,
      this.INIT_SORT_DIR
    );
    this.onLoadEvent({ pagination: initialPagination });
  }

  /**
   * Gets new data for table
   * @param loadEvent event emitted by table component to get new data
   */
  onLoadEvent(loadEvent: TableLoadEvent): void {
    this.paginationService.setPagination(loadEvent.pagination.size);
    this.detectionEventParticipantService
      .getAll(
        this.eventId,
        new OffsetPaginationEvent(0, loadEvent.pagination.size, loadEvent.pagination.sort, loadEvent.pagination.sortDir)
      )
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }
}
