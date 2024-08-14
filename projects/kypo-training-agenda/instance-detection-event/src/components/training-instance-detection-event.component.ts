import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { Observable } from 'rxjs';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { AbstractDetectionEvent } from '@muni-kypo-crp/training-model';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { map, take } from 'rxjs/operators';
import { DetectionEventTable } from '../model/detection-event-table';
import { DetectionEventService } from '../services/detection-event.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Main component of training instance detection event.
 */
@Component({
  selector: 'kypo-training-instance-detection-event',
  templateUrl: './training-instance-detection-event.component.html',
  styleUrls: ['./training-instance-detection-event.component.css'],
})
export class TrainingInstanceDetectionEventComponent implements OnInit {
  @Input() paginationId = 'training-instance-detection-event';
  readonly INIT_SORT_NAME = 'levelId';
  readonly INIT_SORT_DIR = 'asc';

  cheatingDetectionId: number;
  detectionEvents$: Observable<SentinelTable<AbstractDetectionEvent>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  trainingInstanceId: number;
  destroyRef = inject(DestroyRef);

  constructor(
    private detectionEventService: DetectionEventService,
    private paginationService: PaginationService,
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
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
    this.paginationService.setPagination(this.paginationId, loadEvent.pagination.size);
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
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
      this.paginationService.getPagination(this.paginationId),
      this.INIT_SORT_NAME,
      this.INIT_SORT_DIR
    );
    this.onLoadEvent({ pagination: initialPagination });
  }
}
