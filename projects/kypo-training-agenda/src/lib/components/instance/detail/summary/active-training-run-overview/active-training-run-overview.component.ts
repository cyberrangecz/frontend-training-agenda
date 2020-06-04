import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { KypoBaseComponent, KypoRequestedPagination } from 'kypo-common';
import { TrainingInstance } from 'kypo-training-model';
import { Kypo2Table, LoadTableEvent } from 'kypo2-table';
import { TableActionEvent } from 'kypo2-table/lib/model/table-action-event';
import { Observable } from 'rxjs';
import { map, retryWhen, skipWhile, take, takeWhile } from 'rxjs/operators';
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
  @Input() activeTrainingRuns: Kypo2Table<TrainingRunRowAdapter>;
  @Input() hasError: boolean;

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRunRowAdapter>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();

  ngOnInit() {}

  /**
   * Emits table action event
   * @param event action event emitted from table
   */
  onTableAction(event: TableActionEvent<TrainingRunRowAdapter>) {
    this.tableAction.emit(event);
  }

  /**
   * Emits load table vent
   * @param event reload data event emitted from table
   */
  onLoadTableEvent(event: LoadTableEvent) {
    this.loadTableEvent.emit(event);
  }
}
