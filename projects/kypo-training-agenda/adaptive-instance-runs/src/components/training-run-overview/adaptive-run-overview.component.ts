import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, TableLoadEvent, TableActionEvent } from '@sentinel/components/table';

/**
 * Component displaying training runs and its state in real time.
 */
@Component({
  selector: 'kypo-adaptive-run-overview',
  templateUrl: './adaptive-run-overview.component.html',
  styleUrls: ['./adaptive-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveRunOverviewComponent extends SentinelBaseDirective {
  @Input() adaptiveRuns: SentinelTable<TrainingRun>;
  @Input() hasError: boolean;

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRun>> = new EventEmitter();
  @Output() TableLoadEvent: EventEmitter<TableLoadEvent> = new EventEmitter();

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
  onTableLoadEvent(event: TableLoadEvent): void {
    this.TableLoadEvent.emit(event);
  }
}
