import { PaginatedResource } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, DeleteAction } from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { ArchivedTrainingRunService } from '../services/state/archived-runs/archived-training-run.service';
import { TrainingRunRowAdapter } from './training-run-row-adapter';

/**
 * @dynamic
 */
export class ArchivedTrainingRunTable extends SentinelTable<TrainingRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>, service: ArchivedTrainingRunService) {
    const columns = [new Column('playerName', 'player', false), new Column('state', 'training run state', false)];
    const rows = resource.elements.map((element) => ArchivedTrainingRunTable.createRow(element, service));
    super(rows, columns);
    this.selectable = true;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: ArchivedTrainingRunService): Row<TrainingRunRowAdapter> {
    const adapter = element as TrainingRunRowAdapter;
    adapter.playerName = adapter.player.name;
    return new Row(adapter, this.createActions(element, service));
  }

  private static createActions(element: TrainingRun, service: ArchivedTrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete archived training run',
        of(false),
        defer(() => service.delete(element.id))
      ),
    ];
  }
}
