import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { TrainingRun, TrainingRunStateEnum } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowExpand } from '@sentinel/components/table';
import { TrainingRunRowAdapter } from './training-run-row-adapter';
import { DateHelper } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunInfoComponent } from '../components/runs/detail/training-run-info.component';

/**
 * @dynamic
 */
export class TrainingRunTable extends SentinelTable<TrainingRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>) {
    const columns = [
      new Column('playerName', 'player', false),
      new Column('startTimeFormatted', 'start time', true, 'startTime'),
      new Column('endTimeFormatted', 'end time', true, 'endTime'),
      new Column('state', 'run state', true, 'state'),
      new Column('duration', 'duration', false),
      new Column('sandboxInstanceId', 'sandbox id', false),
      /**
       * DISABLED FOR THE 23.03 release
       */
      // new Column('hasDetectionEvents', 'has detection events', false),
    ];
    const rows = resource.elements.map((element) => TrainingRunTable.createRow(element));
    super(rows, columns);
    this.expand = new RowExpand(TrainingRunInfoComponent);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun): Row<TrainingRunRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as TrainingRunRowAdapter;
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
