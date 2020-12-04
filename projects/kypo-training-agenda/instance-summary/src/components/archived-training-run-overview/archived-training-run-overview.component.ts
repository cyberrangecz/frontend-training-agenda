import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class ArchivedTrainingRunOverviewComponent extends SentinelBaseDirective implements OnInit {
  @Input() trainingRuns: SentinelTable<TrainingRun>;
  @Input() hasError: boolean;
  @Input() controls: SentinelControlItem[];

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRun>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TrainingRun[]> = new EventEmitter();
  @Output() controlsAction: EventEmitter<SentinelControlItem> = new EventEmitter();

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
  onControlsAction(controlItem: SentinelControlItem) {
    this.controlsAction.emit(controlItem);
  }
}
