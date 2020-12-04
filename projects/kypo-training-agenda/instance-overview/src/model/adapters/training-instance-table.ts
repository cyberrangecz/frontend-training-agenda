import { SentinelDateTimeFormatPipe, PaginatedResource } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import {
  Column,
  SentinelTable,
  Row,
  RowAction,
  EditAction,
  DeleteAction,
  DownloadAction,
} from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceOverviewService } from '../../services/state/training-instance-overview.service';
import { TrainingInstanceRowAdapter } from './training-instance-row-adapter';

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
      new Column('id', 'Id', true),
      new Column('title', 'Title', true),
      new Column('date', 'Date', true, 'startTime'),
      new Column('tdTitle', 'Training Definition', false),
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
    adapter.date = `${datePipe.transform(adapter.startTime)} - ${datePipe.transform(adapter.endTime)}`;
    if (adapter.hasPool()) {
      adapter.poolTitle = `Pool ${adapter.poolId}`;
    } else {
      adapter.poolTitle = '-';
    }
    const row = new Row(adapter, this.createActions(ti, service));

    row.addLink('title', navigator.toTrainingInstanceDetail(ti.id));
    row.addLink('accessToken', navigator.toTrainingInstanceAccessToken(ti.id));
    if (ti.hasPool()) {
      row.element.poolSize = service.getPoolState(ti.poolId);
      row.addLink('poolTitle', navigator.toPool(ti.poolId));
    } else {
      row.element.poolSize = of('-');
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
        defer(() => service.delete(ti.id))
      ),
      new DownloadAction(
        'Download ZIP file containing all training instance data',
        of(false),
        defer(() => service.download(ti.id))
      ),
      new RowAction(
        'access',
        'Get Access',
        'vpn_key',
        'primary',
        'Get SSH Access',
        of(false),
        defer(() => service.getSshAccess(ti.poolId))
      ),
    ];
  }
}
