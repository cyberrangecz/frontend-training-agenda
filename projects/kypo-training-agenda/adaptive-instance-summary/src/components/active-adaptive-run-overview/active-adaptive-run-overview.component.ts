import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';

/**
 * Component displaying active adaptive runs and its state in real time.
 */
@Component({
  selector: 'kypo-active-adaptive-run-overview',
  templateUrl: './active-adaptive-run-overview.component.html',
  styleUrls: ['./active-adaptive-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveAdaptiveRunOverviewComponent extends SentinelBaseDirective {
  @Input() activeTrainingRuns: SentinelTable<TrainingRun>;
  @Input() hasError: boolean;

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRun>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();

  /**
   * Emits table action event
   * @param event action event emitted from table
   */
  onTableAction(event: TableActionEvent<TrainingRun>): void {
    this.tableAction.emit(event);
  }

  /**
   * Emits load table vent
   * @param event reload data event emitted from table
   */
  onLoadTableEvent(event: LoadTableEvent): void {
    this.loadTableEvent.emit(event);
  }
}
