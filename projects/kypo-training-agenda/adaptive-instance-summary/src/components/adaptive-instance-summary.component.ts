import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { TrainingInstance, TrainingRun } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
  TrainingNavigator,
  ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME,
  TrainingNotificationService,
} from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceSummaryService } from '../services/state/summary/adaptive-instance-summary.service';
import { TableLoadEvent, SentinelTable, TableActionEvent } from '@sentinel/components/table';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveRunService } from '../services/state/runs/adaptive-run.service';
import { AdaptiveRunTable } from '../model/adaptive-run-table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Smart component of adaptive instance summary
 */
@Component({
  selector: 'kypo-adaptive-instance-summary',
  templateUrl: './adaptive-instance-summary.component.html',
  styleUrls: ['./adaptive-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceSummaryComponent implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  adaptiveRuns$: Observable<SentinelTable<TrainingRun>>;
  adaptiveRunsHasError$: Observable<boolean>;
  hasStarted$: Observable<boolean>;

  trainingInstanceAccessTokenLink: string;
  trainingInstancePoolIdLink: string;
  adaptiveDefinitionLink: string;
  hasPool: boolean;
  destroyRef = inject(DestroyRef);

  constructor(
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator,
    private adaptiveInstanceSummaryService: AdaptiveInstanceSummaryService,
    private paginationService: PaginationService,
    private adaptiveRunService: AdaptiveRunService,
    private notificationService: TrainingNotificationService
  ) {}

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      map((data) => data[ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((ti) => {
        this.initSummaryComponent(ti);
      })
    );
    this.initAdaptiveRunsComponent();
  }

  /**
   * Resolves type of action and calls handler
   * @param event action event emitted from table
   */
  onTrainingRunTableAction(event: TableActionEvent<TrainingRun>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  /**
   * Calls service to get new data for table
   * @param event reload data event emitted from table
   */
  onTrainingRunTableLoadEvent(event: TableLoadEvent): void {
    this.paginationService.setPagination(event.pagination.size);
    this.trainingInstance$
      .pipe(
        switchMap((ti) =>
          this.adaptiveRunService.getAll(
            ti.id,
            new OffsetPaginationEvent(0, event.pagination.size, event.pagination.sort, event.pagination.sortDir)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private initSummaryComponent(trainingInstance: TrainingInstance) {
    this.adaptiveInstanceSummaryService.init(trainingInstance);
    this.trainingInstanceAccessTokenLink = `/${this.navigator.toAdaptiveInstanceAccessToken(trainingInstance.id)}`;
    this.trainingInstancePoolIdLink = `/${this.navigator.toPool(trainingInstance.poolId)}`;
    this.adaptiveDefinitionLink = `/${this.navigator.toAdaptiveDefinitionDetail(
      trainingInstance.trainingDefinition.id
    )}`;
    this.hasPool = trainingInstance.hasPool();
    this.hasStarted$ = this.adaptiveInstanceSummaryService.hasStarted$;
  }

  private initAdaptiveRunsComponent() {
    const initialPagination = new OffsetPaginationEvent(0, this.paginationService.getPagination(), '', 'asc');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.adaptiveRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.adaptiveRuns$ = this.adaptiveRunService.resource$.pipe(
      takeUntilDestroyed(this.destroyRef),
      map((resource) => new AdaptiveRunTable(resource))
    );
    this.adaptiveRunsHasError$ = this.adaptiveRunService.hasError$;
  }

  onShowProgress(): void {
    this.adaptiveInstanceSummaryService.showProgress();
  }

  onShowNotification(data: string[]): void {
    this.notificationService.emit(data[0] as any, data[1]);
  }
}
