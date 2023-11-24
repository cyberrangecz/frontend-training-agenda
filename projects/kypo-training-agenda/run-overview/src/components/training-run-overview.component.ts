import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { AccessedTrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, TableLoadEvent, TableActionEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { AccessedTrainingRunTable } from '../model/accessed-training-run-table';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AccessedTrainingRunService } from '../services/state/training/accessed-training-run.service';
import { AccessedAdaptiveRunService } from '../services/state/adaptive/accessed-adaptive-run.service';
import { SentinelControlItem } from '@sentinel/components/controls';
import { AccessedTrainingRunControls } from '../model/accessed-training-run-controls';

/**
 * Main smart component of the trainee overview.
 */
@Component({
  selector: 'kypo-trainee-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRunOverviewComponent extends SentinelBaseDirective implements OnInit {
  trainingRuns$: Observable<SentinelTable<AccessedTrainingRun>>;
  hasError$: Observable<boolean>;
  isLoading = false;
  controls: SentinelControlItem[];

  constructor(
    private trainingRunOverviewService: AccessedTrainingRunService,
    private accessedAdaptiveRunService: AccessedAdaptiveRunService,
    private paginationService: PaginationService
  ) {
    super();
    this.controls = AccessedTrainingRunControls.create(trainingRunOverviewService);
  }

  ngOnInit(): void {
    this.initTable();
  }

  /**
   * According to PIN number calls service to access training run or adaptive run.
   * @param accessToken token to access the training run or adaptive run
   */
  access(accessToken: string): void {
    this.isLoading = true;
    if (this.isAdaptiveToken(accessToken)) {
      this.accessedAdaptiveRunService
        .access(accessToken)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => (this.isLoading = false));
    } else {
      this.trainingRunOverviewService
        .access(accessToken)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => (this.isLoading = false));
    }
  }

  /**
   * Resolves type of table action and handles it
   * @param event table action event
   */
  onTableAction(event: TableActionEvent<AccessedTrainingRun>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  /**
   * Loads training run data for the table component
   */
  loadAccessedTrainingRuns(loadEvent: TableLoadEvent): void {
    this.trainingRunOverviewService
      .getAll(new OffsetPaginationEvent(0, 0, '', 'asc'))
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  private initTable() {
    const initialLoadEvent: TableLoadEvent = {
      pagination: new OffsetPaginationEvent(0, this.paginationService.getPagination(), '', 'asc'),
    };

    this.trainingRuns$ = this.trainingRunOverviewService.resource$.pipe(
      map((resource) => new AccessedTrainingRunTable(resource, this.trainingRunOverviewService))
    );
    this.hasError$ = this.trainingRunOverviewService.hasError$;
    this.loadAccessedTrainingRuns(initialLoadEvent);
  }

  private isAdaptiveToken(accessToken: string): boolean {
    const re = new RegExp(/^[5-9].+$/);
    return re.test(accessToken.split('-')[1]);
  }

  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }
}
