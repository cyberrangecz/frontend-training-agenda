import { Component, Input, OnInit } from '@angular/core';
import { OffsetPaginationEvent, SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { AbstractDetectionEvent, CheatingDetection } from '@muni-kypo-crp/training-model';
import { SentinelControlItem } from '@sentinel/components/controls';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { CHEATING_DETECTION_DATA_ATTRIBUTE_NAME, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { DetectionEventTable } from '../model/detection-event-table';
import { ActivatedRoute } from '@angular/router';
import { DetectionEventService } from '../services/detection-event.service';

/**
 * Main component of training instance detection event.
 */
@Component({
  selector: 'kypo-training-instance-detection-event',
  templateUrl: './training-instance-detection-event.component.html',
  styleUrls: ['./training-instance-detection-event.component.css'],
})
export class TrainingInstanceDetectionEventComponent extends SentinelBaseDirective implements OnInit {
  cheatingDetection$: Observable<CheatingDetection>;

  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'asc';

  detectionEvents$: Observable<SentinelTable<AbstractDetectionEvent>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  cheatingDetectionId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private detectionEventService: DetectionEventService,
    private paginationService: PaginationService,
    private navigator: TrainingNavigator
  ) {
    super();
  }

  ngOnInit(): void {
    console.log(this.activeRoute)
    this.cheatingDetection$ = this.activeRoute.data.pipe(
      takeWhile(() => this.isAlive),
      map((data) => data[CHEATING_DETECTION_DATA_ATTRIBUTE_NAME]),
      tap((detection) => (this.cheatingDetectionId = detection.id))
    );
    console.log(this.cheatingDetectionId);
    this.cheatingDetection$.subscribe();
    this.initTable();
    console.log(this.navigator, this.detectionEventService);
    this.detectionEventService.getAll(5, null).subscribe();
  }

  /**
   * Gets new data for table
   * @param loadEvent event emitted by table component to get new data
   */
  onLoadEvent(loadEvent: TableLoadEvent): void {
    this.paginationService.setPagination(loadEvent.pagination.size);
    this.detectionEventService
     .getAll(
       this.cheatingDetectionId,
       new OffsetPaginationEvent(0, loadEvent.pagination.size, loadEvent.pagination.sort, loadEvent.pagination.sortDir)
     )
     .pipe(takeWhile(() => this.isAlive))
     .subscribe();
  }

  /**
   * Resolves controls action and calls appropriate handler
   * @param control selected control emitted by controls component
   */
  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(take(1)).subscribe();
  }

  /**
   * Resolves type of emitted event and calls appropriate handler
   * @param event action event emitted from table component
   */
  onTableAction(event: TableActionEvent<AbstractDetectionEvent>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  private initTable() {
    const initialPagination = new OffsetPaginationEvent(
      0,
      this.paginationService.getPagination(),
      this.INIT_SORT_NAME,
      this.INIT_SORT_DIR
    );
    this.onLoadEvent({ pagination: initialPagination });

    this.hasError$ = this.detectionEventService.hasError$;
    this.isLoading$ = this.detectionEventService.isLoading$;
    this.detectionEvents$ = this.detectionEventService.resource$.pipe(
      map((resource) => new DetectionEventTable(resource, this.detectionEventService, this.navigator))
    );
  }
}
