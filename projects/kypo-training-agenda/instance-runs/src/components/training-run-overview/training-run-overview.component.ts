import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';

/**
 * Component displaying training runs and its state in real time.
 */
@Component({
  selector: 'kypo-training-run-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRunOverviewComponent extends SentinelBaseDirective {
  @Input() trainingRuns: SentinelTable<TrainingRun>;
  @Input() hasError: boolean;
  @Input() isLoading: boolean;

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
