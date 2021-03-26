import { PaginatedResource } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, DeleteAction } from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { ActiveAdaptiveRunService } from '../services/state/active-runs/active-adaptive-run.service';
import { AdaptiveRunRowAdapter } from './adaptive-run-row-adapter';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class ActiveAdaptiveRunTable extends SentinelTable<AdaptiveRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>, service: ActiveAdaptiveRunService, trainingInstanceId: number) {
    const columns = [
      new Column('sandboxInstanceId', 'sandbox ID', false),
      new Column('playerName', 'player', false),
      new Column('state', 'adaptive run state', false),
    ];
    const rows = resource.elements.map((element) => {
      element.trainingInstanceId = trainingInstanceId;
      return ActiveAdaptiveRunTable.createRow(element, service);
    });
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: ActiveAdaptiveRunService): Row<AdaptiveRunRowAdapter> {
    const adapter = element as AdaptiveRunRowAdapter;
    adapter.playerName = adapter.player.name;
    return new Row(adapter, this.createActions(element, service));
  }

  private static createActions(element: TrainingRun, service: ActiveAdaptiveRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of active adaptive run',
        of(false),
        defer(() => service.deleteSandbox(element))
      ),
      new RowAction(
        'archive',
        'Archive',
        'archive',
        'primary',
        'Archive adaptive run',
        of(false),
        defer(() => service.archive(element))
      ),
    ];
  }
}
