import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KypoBaseComponent } from 'kypo-common';
import { TrainingInstance } from 'kypo-training-model';
import { Kypo2Table, LoadTableEvent } from 'kypo2-table';
import { TableActionEvent } from 'kypo2-table/lib/model/table-action-event';
import { Observable } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { TrainingRunRowAdapter } from '../../../../../model/adapters/table/rows/training-run-row-adapter';
import { ActiveTrainingRunTable } from '../../../../../model/adapters/table/training-run/active-training-run-table';
import { ActiveTrainingRunService } from '../../../../../services/training-run/active/active-training-run.service';

/**
 * Component displaying active training runs and its state in real time.
 */
@Component({
  selector: 'kypo-active-training-run-overview',
  templateUrl: './active-training-run-overview.component.html',
  styleUrls: ['./active-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTrainingRunOverviewComponent extends KypoBaseComponent implements OnInit {
  @Input() trainingInstance: TrainingInstance;
  @Input() isPollingActive: boolean;

  activeTrainingRuns$: Observable<Kypo2Table<TrainingRunRowAdapter>>;
  activeTrainingRunsTableHasError$: Observable<boolean>;

  constructor(private activeTrainingRunService: ActiveTrainingRunService) {
    super();
  }

  ngOnInit() {
    this.startPolling();
  }

  /**
   * Resolves type of action and calls handler
   * @param event action event emitted from table
   */
  onActiveTrainingRunAction(event: TableActionEvent<TrainingRunRowAdapter>) {
    event.action.result$.pipe(take(1)).subscribe();
  }

  /**
   * Calls service to get new data for table
   * @param event reload data event emitted from table
   */
  onTableLoadEvent(event: LoadTableEvent) {
    this.activeTrainingRunService
      .getAll(this.trainingInstance.id, event.pagination)
      .pipe(takeWhile((_) => this.isAlive))
      .subscribe();
  }

  private startPolling() {
    this.activeTrainingRunService.startPolling(this.trainingInstance);
    this.activeTrainingRuns$ = this.activeTrainingRunService.resource$.pipe(
      takeWhile((_) => this.isPollingActive),
      map((resource) => new ActiveTrainingRunTable(resource, this.activeTrainingRunService))
    );
    this.activeTrainingRunsTableHasError$ = this.activeTrainingRunService.hasError$;
  }
}
