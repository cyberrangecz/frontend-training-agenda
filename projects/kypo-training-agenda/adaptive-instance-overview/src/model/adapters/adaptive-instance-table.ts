import { SentinelDateTimeFormatPipe, PaginatedResource } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Column, SentinelTable, Row, RowAction, EditAction, DeleteAction } from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceRowAdapter } from './adaptive-instance-row-adapter';
import { AdaptiveInstanceOverviewService } from '../../services/state/adaptive-instance-overview.service';

/**
 * @dynamic
 */
export class AdaptiveInstanceTable extends SentinelTable<AdaptiveInstanceRowAdapter> {
  constructor(
    resource: PaginatedResource<TrainingInstance>,
    service: AdaptiveInstanceOverviewService,
    navigator: TrainingNavigator
  ) {
    const columns = [
      new Column('id', 'Id', true),
      new Column('title', 'Title', true),
      new Column('date', 'Date', true, 'startTime'),
      new Column('tdTitle', 'Adaptive Definition', false),
      new Column('poolTitle', 'Pool', false),
      new Column('poolSize', 'Pool Size', false),
      new Column('accessToken', 'Access Token', false),
    ];
    const rows = resource.elements.map((element) => AdaptiveInstanceTable.createRow(element, service, navigator));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterLabel = 'Filter by title';
    this.filterable = true;
    this.selectable = false;
  }

  private static createRow(
    ti: TrainingInstance,
    service: AdaptiveInstanceOverviewService,
    navigator: TrainingNavigator
  ): Row<AdaptiveInstanceRowAdapter> {
    const adapter = ti as AdaptiveInstanceRowAdapter;
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    adapter.tdTitle = adapter.trainingDefinition.title;
    adapter.date = `${datePipe.transform(adapter.startTime)} - ${datePipe.transform(adapter.endTime)}`;
    if (adapter.hasPool()) {
      adapter.poolTitle = `Pool ${adapter.poolId}`;
    } else {
      adapter.poolTitle = '-';
    }
    const row = new Row(adapter, this.createActions(ti, service));

    row.addLink('title', navigator.toAdaptiveInstanceDetail(ti.id));
    row.addLink('accessToken', navigator.toAdaptiveInstanceAccessToken(ti.id));
    if (ti.hasPool()) {
      row.element.poolSize = service.getPoolState(ti.poolId);
      row.addLink('poolTitle', navigator.toPool(ti.poolId));
    } else {
      row.element.poolSize = of('-');
    }
    return row;
  }

  private static createActions(ti: TrainingInstance, service: AdaptiveInstanceOverviewService): RowAction[] {
    return [
      new EditAction(
        'Edit training instance',
        of(false),
        defer(() => service.edit(ti.id))
      ),
      new DeleteAction(
        'Delete training instance',
        of(false),
        defer(() => service.delete(ti.id))
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
    ];
  }
}
