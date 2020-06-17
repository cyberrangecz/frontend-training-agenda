import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KypoBaseComponent } from 'kypo-common';
import { KypoControlItem } from 'kypo-controls';
import { TrainingRun } from 'kypo-training-model';
import { Kypo2Table, LoadTableEvent, TableActionEvent } from 'kypo2-table';
import { TrainingRunRowAdapter } from '../../../../../model/adapters/table/rows/training-run-row-adapter';
/**
 * Component for displaying archived (finished by trainee and with sandbox removed) training runs for organizer in real-time.
 */
@Component({
  selector: 'kypo-archived-training-run-overview',
  templateUrl: './archived-training-run-overview.component.html',
  styleUrls: ['./archived-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedTrainingRunOverviewComponent extends KypoBaseComponent implements OnInit {
  @Input() trainingRuns: Kypo2Table<TrainingRun>;
  @Input() hasError: boolean;
  @Input() controls: KypoControlItem[];

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRun>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TrainingRun[]> = new EventEmitter();
  @Output() controlsAction: EventEmitter<KypoControlItem> = new EventEmitter();

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

  /**
   * Emits selection change event
   * @param selection new selection
   */
  onSelectionChange(selection: TrainingRun[]) {
    this.selectionChange.emit(selection);
  }

  /**
   * Emits control action event
   * @param controlItem clicked control item
   */
  onControlsAction(controlItem: KypoControlItem) {
    this.controlsAction.emit(controlItem);
  }
}
