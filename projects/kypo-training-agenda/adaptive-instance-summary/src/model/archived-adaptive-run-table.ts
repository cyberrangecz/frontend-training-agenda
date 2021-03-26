import { PaginatedResource } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, DeleteAction } from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { ArchivedAdaptiveRunService } from '../services/state/archived-runs/archived-adaptive-run.service';
import { AdaptiveRunRowAdapter } from './adaptive-run-row-adapter';

/**
 * @dynamic
 */
export class ArchivedAdaptiveRunTable extends SentinelTable<AdaptiveRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>, service: ArchivedAdaptiveRunService) {
    const columns = [new Column('playerName', 'player', false), new Column('state', 'adaptive run state', false)];
    const rows = resource.elements.map((element) => ArchivedAdaptiveRunTable.createRow(element, service));
    super(rows, columns);
    this.selectable = true;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: ArchivedAdaptiveRunService): Row<AdaptiveRunRowAdapter> {
    const adapter = element as AdaptiveRunRowAdapter;
    adapter.playerName = adapter.player.name;
    return new Row(adapter, this.createActions(element, service));
  }

  private static createActions(element: TrainingRun, service: ArchivedAdaptiveRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete archived adaptive run',
        of(false),
        defer(() => service.delete(element.id))
      ),
    ];
  }
}
