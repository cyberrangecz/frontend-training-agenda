import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@kypo/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';

/**
 * Component displaying active training runs and its state in real time.
 */
@Component({
  selector: 'kypo-active-training-run-overview',
  templateUrl: './active-training-run-overview.component.html',
  styleUrls: ['./active-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTrainingRunOverviewComponent extends SentinelBaseDirective implements OnInit {
  @Input() activeTrainingRuns: SentinelTable<TrainingRun>;
  @Input() hasError: boolean;

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRun>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();

  ngOnInit() {}

  /**
   * Emits table action event
   * @param event action event emitted from table
   */
  onTableAction(event: TableActionEvent<TrainingRun>) {
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
