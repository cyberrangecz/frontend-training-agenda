import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestedPagination, SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance, TrainingRun } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import {
  TrainingNavigator,
  ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME,
  TrainingNotificationService,
} from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceSummaryService } from '../services/state/summary/adaptive-instance-summary.service';
import { LoadTableEvent, SentinelTable, TableActionEvent } from '@sentinel/components/table';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveRunService } from '../services/state/runs/adaptive-run.service';
import { AdaptiveRunTable } from '../model/adaptive-run-table';

/**
 * Smart component of adaptive instance summary
 */
@Component({
  selector: 'kypo-adaptive-instance-summary',
  templateUrl: './adaptive-instance-summary.component.html',
  styleUrls: ['./adaptive-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceSummaryComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  adaptiveRuns$: Observable<SentinelTable<TrainingRun>>;
  adaptiveRunsHasError$: Observable<boolean>;
  hasStarted$: Observable<boolean>;

  trainingInstanceAccessTokenLink: string;
  trainingInstancePoolIdLink: string;
  adaptiveDefinitionLink: string;
  hasPool: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator,
    private adaptiveInstanceSummaryService: AdaptiveInstanceSummaryService,
    private paginationService: PaginationService,
    private adaptiveRunService: AdaptiveRunService,
    private notificationService: TrainingNotificationService
  ) {
    super();
  }

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
  onTrainingRunTableLoadEvent(event: LoadTableEvent): void {
    this.paginationService.setPagination(event.pagination.size);
    this.trainingInstance$
      .pipe(
        switchMap((ti) => this.adaptiveRunService.getAll(ti.id, event.pagination)),
        takeWhile(() => this.isAlive)
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
    const initialPagination = new RequestedPagination(0, this.paginationService.getPagination(), '', '');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.adaptiveRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.adaptiveRuns$ = this.adaptiveRunService.resource$.pipe(
      takeWhile(() => this.isAlive),
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
