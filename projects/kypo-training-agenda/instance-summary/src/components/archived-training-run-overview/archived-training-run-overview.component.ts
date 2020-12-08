import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';
/**
 * Component for displaying archived (finished by trainee and with sandbox removed) training runs for organizer in real-time.
 */
@Component({
  selector: 'kypo-archived-training-run-overview',
  templateUrl: './archived-training-run-overview.component.html',
  styleUrls: ['./archived-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedTrainingRunOverviewComponent extends SentinelBaseDirective {
  @Input() trainingRuns: SentinelTable<TrainingRun>;
  @Input() hasError: boolean;
  @Input() controls: SentinelControlItem[];

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRun>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TrainingRun[]> = new EventEmitter();
  @Output() controlsAction: EventEmitter<SentinelControlItem> = new EventEmitter();

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

  /**
   * Emits selection change event
   * @param selection new selection
   */
  onSelectionChange(selection: TrainingRun[]): void {
    this.selectionChange.emit(selection);
  }

  /**
   * Emits control action event
   * @param controlItem clicked control item
   */
  onControlsAction(controlItem: SentinelControlItem): void {
    this.controlsAction.emit(controlItem);
  }
}
