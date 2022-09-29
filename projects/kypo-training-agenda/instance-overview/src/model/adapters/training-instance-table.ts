import { SentinelDateTimeFormatPipe, PaginatedResource } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, EditAction, DeleteAction } from '@sentinel/components/table';
import { combineLatest, defer, of, tap } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceOverviewService } from '../../services/state/training-instance-overview.service';
import { TrainingInstanceRowAdapter } from './training-instance-row-adapter';
import { DateHelper } from '@muni-kypo-crp/training-agenda/internal';

/**
 * @dynamic
 */
export class TrainingInstanceTable extends SentinelTable<TrainingInstanceRowAdapter> {
  constructor(
    resource: PaginatedResource<TrainingInstance>,
    service: TrainingInstanceOverviewService,
    navigator: TrainingNavigator
  ) {
    const columns = [
      new Column('title', 'Title', true),
      new Column('startTimeFormatted', 'Start Time', true, 'startTime'),
      new Column('endTimeFormatted', 'End Time', true, 'endTime'),
      new Column('expiresIn', 'Expires In', false),
      new Column('tdTitle', 'Training Definition', false),
      new Column('lastEditBy', 'Last Edit By', false),
      new Column('poolTitle', 'Pool', false),
      new Column('poolSize', 'Pool Size', false),
      new Column('accessToken', 'Access Token', false),
    ];
    const rows = resource.elements.map((element) => TrainingInstanceTable.createRow(element, service, navigator));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterLabel = 'Filter by title';
    this.filterable = true;
    this.selectable = false;
  }

  private static createRow(
    ti: TrainingInstance,
    service: TrainingInstanceOverviewService,
    navigator: TrainingNavigator
  ): Row<TrainingInstanceRowAdapter> {
    const adapter = ti as TrainingInstanceRowAdapter;
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    adapter.tdTitle = adapter.trainingDefinition.title;
    adapter.startTimeFormatted = `${datePipe.transform(adapter.startTime)}`;
    adapter.endTimeFormatted = `${datePipe.transform(adapter.endTime)}`;
    adapter.expiresIn =
      DateHelper.timeToDate(adapter.endTime).length !== 0 ? DateHelper.timeToDate(adapter.endTime) : 'expired';
    if (adapter.hasPool()) {
      adapter.poolTitle = `Pool ${adapter.poolId}`;
    } else if (adapter.localEnvironment) {
      adapter.poolTitle = `Local`;
    } else {
      adapter.poolTitle = '-';
    }
    const row = new Row(adapter, this.createActions(ti, service));

    row.addLink('title', navigator.toTrainingInstanceDetail(ti.id));
    row.addLink('tdTitle', navigator.toTrainingDefinitionDetail(adapter.trainingDefinition.id));
    if (ti.hasPool()) {
      row.element.poolSize = combineLatest([service.getPoolSize(ti.poolId), service.getAvailableSandboxes(ti.poolId)]);
      row.addLink('poolTitle', navigator.toPool(ti.poolId));
    } else {
      row.element.poolSize = of(['-', '']);
    }
    return row;
  }

  private static createActions(ti: TrainingInstance, service: TrainingInstanceOverviewService): RowAction[] {
    return [
      new EditAction(
        'Edit training instance',
        of(false),
        defer(() => service.edit(ti.id))
      ),
      new DeleteAction(
        'Delete training instance',
        of(false),
        defer(() => service.delete(ti))
      ),
      new RowAction(
        'get_data',
        'Get Data',
        'cloud_download',
        'primary',
        'Download ZIP file containing all training instance data',
        of(false),
        defer(() => service.download(ti.id))
      ),
      new RowAction(
        'get_ssh_configs',
        'Get SSH Configs',
        'vpn_key',
        'primary',
        'Download management SSH configs',
        of(!ti.hasPool()),
        defer(() => service.getSshAccess(ti.poolId))
      ),
      new RowAction(
        'training_runs',
        'Training Runs',
        'run_circle',
        'primary',
        'Manage training runs',
        of(false),
        defer(() => service.runs(ti.id))
      ),
      new RowAction(
        'display_token',
        'Display Token',
        'pin',
        'primary',
        'Display page containing access token',
        of(false),
        defer(() => service.token(ti.id))
      ),
      new RowAction(
        'progress',
        'Show Progress',
        'insights',
        'primary',
        'Shows progress of training runs',
        of(!ti.hasStarted()),
        defer(() => service.progress(ti.id))
      ),
      new RowAction(
        'results',
        'Show Results',
        'assessment',
        'primary',
        'Shows results of training runs',
        of(!ti.hasStarted()),
        defer(() => service.results(ti.id))
      ),
      new RowAction(
        'results',
        'Show Aggregated Results',
        'stacked_bar_chart',
        'primary',
        'Shows aggregated results of training runs across same training instances',
        of(!ti.hasStarted()),
        defer(() => service.aggregatedResults(ti.id))
      ),
    ];
  }
}
