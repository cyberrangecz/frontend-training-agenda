import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { LoadTableEvent, SentinelTable, TableActionEvent } from '@sentinel/components/table';

@Component({
  selector: 'kypo-adaptive-instance-runs',
  templateUrl: './adaptive-instance-runs.component.html',
  styleUrls: ['./adaptive-instance-runs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceRunsComponent extends SentinelBaseDirective {
  @Input() trainingRuns: SentinelTable<TrainingRun>;
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
