import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { TrainingRun, TrainingRunStateEnum } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, DeleteAction } from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { AdaptiveRunService } from '../services/runs/adaptive-run.service';
import { AdaptiveRunRowAdapter } from './adaptive-run-row-adapter';
import { DateHelper } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class AdaptiveRunTable extends SentinelTable<AdaptiveRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>, service: AdaptiveRunService, trainingInstanceId: number) {
    const columns = [
      new Column('playerName', 'player', false),
      new Column('startTimeFormatted', 'start time', false),
      new Column('endTimeFormatted', 'end time', false),
      new Column('state', 'run state', false),
      new Column('duration', 'duration', false),
      new Column('sandboxInstanceId', 'sandbox id', false),
    ];
    const rows = resource.elements.map((element) => {
      element.trainingInstanceId = trainingInstanceId;
      return AdaptiveRunTable.createRow(element, service);
    });
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: AdaptiveRunService): Row<AdaptiveRunRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as AdaptiveRunRowAdapter;
    adapter.playerName = adapter.player.name;
    adapter.startTimeFormatted = `${datePipe.transform(adapter.startTime)}`;
    if (adapter.state === TrainingRunStateEnum.FINISHED) {
      adapter.endTimeFormatted = `${datePipe.transform(adapter.endTime)}`;
      adapter.duration = DateHelper.timeBetweenDates(adapter.startTime, adapter.endTime);
    } else {
      adapter.endTimeFormatted = '-';
      adapter.duration = '-';
    }
    return new Row(adapter, this.createActions(element, service));
  }

  private static createActions(element: TrainingRun, service: AdaptiveRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of adaptive training run',
        of(false),
        defer(() => service.delete(element))
      ),
    ];
  }
}
