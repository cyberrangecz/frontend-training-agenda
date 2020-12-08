import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective, RequestedPagination } from '@sentinel/common';
import { AccessedTrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { AccessedTrainingRunTable } from '../model/accessed-training-run-table';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { AccessedTrainingRunService } from '../services/state/accessed-training-run.service';

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

  constructor(private trainingRunOverviewService: AccessedTrainingRunService, private context: TrainingAgendaContext) {
    super();
  }

  ngOnInit(): void {
    this.initTable();
  }

  /**
   * Calls service to access training run
   * @param accessToken token to access the training run
   */
  access(accessToken: string): void {
    this.trainingRunOverviewService
      .access(accessToken)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
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
   * @param event load table event
   */
  loadAccessedTrainingRuns(event: LoadTableEvent): void {
    this.trainingRunOverviewService
      .getAll(event.pagination)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, this.context.config.defaultPaginationSize, '', '')
    );

    this.trainingRuns$ = this.trainingRunOverviewService.resource$.pipe(
      map((resource) => new AccessedTrainingRunTable(resource, this.trainingRunOverviewService))
    );
    this.hasError$ = this.trainingRunOverviewService.hasError$;
    this.loadAccessedTrainingRuns(initialLoadEvent);
  }
}
