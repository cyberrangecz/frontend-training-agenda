import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {KypoBaseComponent, KypoRequestedPagination} from 'kypo-common';
import {map, take, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AccessedTrainingRun} from 'kypo-training-model';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';
import {AccessedTrainingRunTable} from '../../../model/adapters/table/training-run/accessed-training-run-table';
import {TrainingAgendaContext} from '../../../services/internal/training-agenda-context.service';

/**
 * Main smart component of the trainee overview.
 */
@Component({
  selector: 'kypo-trainee-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingRunOverviewComponent extends KypoBaseComponent implements OnInit {

  trainingRuns$: Observable<Kypo2Table<AccessedTrainingRun>>;
  hasError$: Observable<boolean>;

  constructor(private trainingRunOverviewService: AccessedTrainingRunService,
              private context: TrainingAgendaContext) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  /**
   * Calls service to access training run
   * @param accessToken token to access the training run
   */
  access(accessToken: string) {
    this.trainingRunOverviewService.access(accessToken)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Resolves type of table action and handles it
   * @param event table action event
   */
  onTableAction(event: TableActionEvent<AccessedTrainingRun>) {
    event.action.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  /**
   * Loads training run data for the table component
   * @param event load table event
   */
  loadAccessedTrainingRuns(event: LoadTableEvent) {
    this.trainingRunOverviewService.getAll(event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new KypoRequestedPagination(0, this.context.config.defaultPaginationSize, '', ''));

    this.trainingRuns$ = this.trainingRunOverviewService.resource$
      .pipe(
        map(resource => new AccessedTrainingRunTable(resource, this.trainingRunOverviewService))
      );
    this.hasError$ = this.trainingRunOverviewService.hasError$;
    this.loadAccessedTrainingRuns(initialLoadEvent);
  }
}
