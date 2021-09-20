import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { TrainingRun, TrainingRunStateEnum } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row } from '@sentinel/components/table';
import { AdaptiveRunRowAdapter } from './adaptive-run-row-adapter';
import { DateHelper } from '@muni-kypo-crp/training-agenda/internal';

/**
 * @dynamic
 */
export class AdaptiveRunTable extends SentinelTable<AdaptiveRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>) {
    const columns = [
      new Column('playerName', 'player', false),
      new Column('startTimeFormatted', 'start time', false),
      new Column('endTimeFormatted', 'end time', false),
      new Column('state', 'run state', false),
      new Column('duration', 'duration', false),
      new Column('sandboxInstanceId', 'sandbox id', false),
    ];
    const rows = resource.elements.map((element) => AdaptiveRunTable.createRow(element));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun): Row<AdaptiveRunRowAdapter> {
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
    return new Row(adapter);
  }
}
