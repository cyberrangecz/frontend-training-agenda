import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { TrainingRun, TrainingRunStateEnum } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, DeleteAction } from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { TrainingRunService } from '../services/runs/training-run.service';
import { TrainingRunRowAdapter } from './training-run-row-adapter';
import { DateHelper } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class TrainingRunTable extends SentinelTable<TrainingRunRowAdapter> {
  constructor(resource: PaginatedResource<TrainingRun>, service: TrainingRunService, trainingInstanceId: number) {
    const columns = [
      new Column('playerName', 'player', false),
      new Column('startTimeFormatted', 'start time', false),
      new Column('endTimeFormatted', 'end time', false),
      new Column('state', 'run state', false),
      new Column('duration', 'duration', false),
      new Column('sandboxInstanceId', 'sandbox id', false),
      new Column('playerEmail', 'email', false),
    ];
    const rows = resource.elements.map((element) => {
      element.trainingInstanceId = trainingInstanceId;
      return TrainingRunTable.createRow(element, service);
    });
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: TrainingRun, service: TrainingRunService): Row<TrainingRunRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as TrainingRunRowAdapter;
    adapter.playerName = adapter.player.name;
    adapter.playerEmail = adapter.player.mail ? adapter.player.mail : '-';
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

  private static createActions(element: TrainingRun, service: TrainingRunService): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of training run',
        of(false),
        defer(() => service.delete(element))
      ),
    ];
  }
}
