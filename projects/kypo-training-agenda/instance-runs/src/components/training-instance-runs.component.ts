import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance, TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, TableActionEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingRunTable } from '../model/training-run-table';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingRunService } from '../services/runs/training-run.service';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Smart component of training instance runs
 */
@Component({
  selector: 'kypo-training-instance-runs',
  templateUrl: './training-instance-runs.component.html',
  styleUrls: ['./training-instance-runs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceRunsComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  trainingRuns$: Observable<SentinelTable<TrainingRun>>;
  trainingRunsHasError$: Observable<boolean>;
  loadingTrainingRuns$: Observable<boolean>;

  archivedTrainingRunsControls: SentinelControlItem[];

  selectedArchivedTrainingRunIds: number[] = [];

  private trainingInstance: TrainingInstance;

  constructor(
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private trainingRunService: TrainingRunService
  ) {
    super();
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((ti) => {
        this.trainingInstance = ti;
      })
    );
    this.initRunsOverviewComponent();
  }

  /**
   * Resolves type of action and calls handler
   * @param event action event emitted from table
   */
  onTrainingRunsTableAction(event: TableActionEvent<TrainingRun>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  private initRunsOverviewComponent() {
    const initialPagination = new OffsetPaginationEvent(0, this.paginationService.getPagination(), '', 'asc');

    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.trainingRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();

    this.trainingRuns$ = this.trainingRunService.resource$.pipe(
      takeWhile(() => this.isAlive),
      map((resource) => {
        return new TrainingRunTable(resource, this.trainingRunService, this.trainingInstance);
      })
    );

    this.trainingRunsHasError$ = this.trainingRunService.hasError$;
    this.loadingTrainingRuns$ = this.trainingRunService.isLoading$;
  }
}
