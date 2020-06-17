import { KypoPaginatedResource } from 'kypo-common';
import { TrainingRun } from 'kypo-training-model';
import { Column, Kypo2Table, Row, RowAction } from 'kypo2-table';
import { DeleteAction } from 'kypo2-table';
import { defer, of } from 'rxjs';
import { ActiveTrainingRunService } from '../../../../services/training-run/active/active-training-run.service';
import { TrainingRunRowAdapter } from '../rows/training-run-row-adapter';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class ActiveTrainingRunTable extends Kypo2Table<TrainingRunRowAdapter> {
  constructor(resource: KypoPaginatedResource<TrainingRun>, service: ActiveTrainingRunService) {
    const columns = [
      new Column('sandboxInstanceId', 'sandbox ID', false),
      new Column('playerName', 'player', false),
      new Column('state', 'training run state', false),
    ];
    const rows = resource.elements.map((element) => ActiveTrainingRunTable.createRow(element, service));
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: ActiveTrainingRunService): Row<TrainingRunRowAdapter> {
    const adapter = element as TrainingRunRowAdapter;
    adapter.playerName = adapter.player.name;
    return new Row(adapter, this.createActions(element, service));
  }

  private static createActions(element: TrainingRun, service: ActiveTrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of active training run',
        of(false),
        defer(() => service.deleteSandbox(element))
      ),
      new RowAction(
        'archive',
        'Archive',
        'archive',
        'primary',
        'Archive training run',
        of(false),
        defer(() => service.archive(element))
      ),
    ];
  }
}
