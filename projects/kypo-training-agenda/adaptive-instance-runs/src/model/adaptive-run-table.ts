import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { TrainingInstance, TrainingRun, TrainingRunStateEnum } from '@muni-kypo-crp/training-model';
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
  constructor(
    resource: PaginatedResource<TrainingRun>,
    service: AdaptiveRunService,
    trainingInstance: TrainingInstance
  ) {
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
      element.trainingInstanceId = trainingInstance.id;
      return AdaptiveRunTable.createRow(element, service, trainingInstance);
    });
    super(rows, columns);
    this.selectable = false;
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(
    element: TrainingRun,
    service: AdaptiveRunService,
    instance: TrainingInstance
  ): Row<AdaptiveRunRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as AdaptiveRunRowAdapter;
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
    return new Row(adapter, this.createActions(element, service, instance));
  }

  private static createActions(
    element: TrainingRun,
    service: AdaptiveRunService,
    instance: TrainingInstance
  ): RowAction[] {
    return [
      new DeleteAction(
        'Delete sandbox of adaptive training run',
        of(false),
        defer(() => service.delete(element, instance.localEnvironment))
      ),
    ];
  }
}
