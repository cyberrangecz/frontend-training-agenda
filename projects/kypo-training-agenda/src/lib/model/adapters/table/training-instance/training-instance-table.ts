import { KypoDateTimeFormatPipe, KypoPaginatedResource } from 'kypo-common';
import { TrainingInstance } from 'kypo-training-model';
import { Column, Kypo2Table, Row, RowAction } from 'kypo2-table';
import { EditAction } from 'kypo2-table';
import { DeleteAction } from 'kypo2-table';
import { DownloadAction } from 'kypo2-table';
import { defer, of } from 'rxjs';
import { TrainingNavigator } from '../../../../services/client/training-navigator.service';
import { TrainingInstanceOverviewService } from '../../../../services/training-instance/training-instance-overview.service';
import { TrainingInstanceRowAdapter } from '../rows/training-instance-row-adapter';

/**
 * @dynamic
 */
export class TrainingInstanceTable extends Kypo2Table<TrainingInstanceRowAdapter> {
  constructor(
    resource: KypoPaginatedResource<TrainingInstance>,
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
    const datePipe = new KypoDateTimeFormatPipe('en-EN');
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
    ];
  }
}
