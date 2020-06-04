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
import { KypoBaseComponent } from 'kypo-common';
import { KypoControlItem } from 'kypo-controls';
import { TrainingInstance } from 'kypo-training-model';
import { Kypo2Table, LoadTableEvent, TableActionEvent } from 'kypo2-table';
import { defer, Observable, of } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { TrainingRunRowAdapter } from '../../../../../model/adapters/table/rows/training-run-row-adapter';
import { ArchivedTrainingRunTable } from '../../../../../model/adapters/table/training-run/archived-training-run-table';
import { ArchivedTrainingRunService } from '../../../../../services/training-run/archived/archived-training-run.service';
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
  @Input() trainingRuns: Kypo2Table<TrainingRunRowAdapter>;
  @Input() hasError: boolean;
  @Input() controls: KypoControlItem[];

  @Output() tableAction: EventEmitter<TableActionEvent<TrainingRunRowAdapter>> = new EventEmitter();
  @Output() loadTableEvent: EventEmitter<LoadTableEvent> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TrainingRunRowAdapter[]> = new EventEmitter();
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
  onSelectionChange(selection: TrainingRunRowAdapter[]) {
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
