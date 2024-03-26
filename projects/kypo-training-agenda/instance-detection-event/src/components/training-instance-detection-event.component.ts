import { Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { Observable } from 'rxjs';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { AbstractDetectionEvent } from '@muni-kypo-crp/training-model';
import { SentinelControlItem } from '@sentinel/components/controls';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { map, take, takeWhile } from 'rxjs/operators';
import { DetectionEventTable } from '../model/detection-event-table';
import { DetectionEventService } from '../services/detection-event.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Main component of training instance detection event.
 */
@Component({
  selector: 'kypo-training-instance-detection-event',
  templateUrl: './training-instance-detection-event.component.html',
  styleUrls: ['./training-instance-detection-event.component.css'],
})
export class TrainingInstanceDetectionEventComponent extends SentinelBaseDirective implements OnInit {
  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'asc';

  cheatingDetectionId: number;
  detectionEvents$: Observable<SentinelTable<AbstractDetectionEvent>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  trainingInstanceId: number;

  constructor(
    private detectionEventService: DetectionEventService,
    private paginationService: PaginationService,
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator
  ) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.data.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.trainingInstanceId = data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME].id;
    });
    this.cheatingDetectionId = this.activeRoute.snapshot.params['trainingInstanceId'];
    this.initTable();
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
        this.trainingInstanceId,
        new OffsetPaginationEvent(
          0,
          loadEvent.pagination.size,
          loadEvent.pagination.sort,
          loadEvent.pagination.sortDir
        ),
        loadEvent.filter
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
    this.hasError$ = this.detectionEventService.hasError$;
    this.isLoading$ = this.detectionEventService.isLoading$;
    this.detectionEvents$ = this.detectionEventService.resource$.pipe(
      map((resource) => new DetectionEventTable(resource, this.detectionEventService, this.navigator))
    );
    const initialPagination = new OffsetPaginationEvent(
      0,
      this.paginationService.getPagination(),
      this.INIT_SORT_NAME,
      this.INIT_SORT_DIR
    );
    this.onLoadEvent({ pagination: initialPagination });
  }
}
