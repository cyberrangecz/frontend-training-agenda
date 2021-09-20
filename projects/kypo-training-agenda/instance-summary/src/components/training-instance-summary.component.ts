import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestedPagination, SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance, TrainingRun } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import {
  TrainingNavigator,
  TrainingNotificationService,
  TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME,
} from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceSummaryService } from '../services/state/summary/training-instance-summary.service';
import { LoadTableEvent, SentinelTable, TableActionEvent } from '@sentinel/components/table';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunService } from '../services/state/runs/training-run.service';
import { TrainingRunTable } from '../model/training-run-table';

/**
 * Smart component of training instance summary
 */
@Component({
  selector: 'kypo-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceSummaryComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  hasStarted$: Observable<boolean>;
  trainingRuns$: Observable<SentinelTable<TrainingRun>>;
  trainingRunsHasError$: Observable<boolean>;

  trainingInstanceAccessTokenLink: string;
  trainingInstancePoolIdLink: string;
  trainingDefinitionLink: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator,
    private trainingInstanceSummaryService: TrainingInstanceSummaryService,
    private notificationService: TrainingNotificationService,
    private paginationService: PaginationService,
    private trainingRunService: TrainingRunService
  ) {
    super();
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((ti) => {
        this.initSummaryComponent(ti);
      })
    );
    this.initTrainingRunsComponent();
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
        switchMap((ti) => this.trainingRunService.getAll(ti.id, event.pagination)),
        takeWhile(() => this.isAlive)
      )
      .subscribe();
  }
  private initSummaryComponent(trainingInstance: TrainingInstance) {
    this.trainingInstanceSummaryService.init(trainingInstance);
    this.trainingInstanceAccessTokenLink = `/${this.navigator.toTrainingInstanceAccessToken(trainingInstance.id)}`;
    this.trainingInstancePoolIdLink = `/${this.navigator.toPool(trainingInstance.poolId)}`;
    this.trainingDefinitionLink = `/${this.navigator.toTrainingDefinitionDetail(
      trainingInstance.trainingDefinition.id
    )}`;
    this.hasStarted$ = this.trainingInstanceSummaryService.hasStarted$;
  }

  private initTrainingRunsComponent() {
    const initialPagination = new RequestedPagination(0, this.paginationService.getPagination(), '', '');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.trainingRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.trainingRuns$ = this.trainingRunService.resource$.pipe(
      takeWhile(() => this.isAlive),
      map((resource) => new TrainingRunTable(resource))
    );
    this.trainingRunsHasError$ = this.trainingRunService.hasError$;
  }

  onShowProgress(): void {
    this.trainingInstanceSummaryService.showProgress();
  }

  onShowResults(): void {
    this.trainingInstanceSummaryService.showResults();
  }

  onShowNotification(data: string[]): void {
    this.notificationService.emit(data[0] as any, data[1]);
  }
}
