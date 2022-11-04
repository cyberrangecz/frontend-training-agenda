import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { Column, SentinelTable, Row, RowAction } from '@sentinel/components/table';
import { AbstractDetectionEvent } from '@muni-kypo-crp/training-model';
import { DetectionEventRowAdapter } from './detection-event-row-adapter';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { defer, of } from 'rxjs';
import { DetectionEventService } from '../services/detection-event.service';

/**
 * @dynamic
 */
export class DetectionEventTable extends SentinelTable<DetectionEventRowAdapter> {
  constructor(
    resource: PaginatedResource<AbstractDetectionEvent>,
    service: DetectionEventService,
    navigator: TrainingNavigator
  ) {
    const columns = [
      new Column('levelTitle', 'level title', false),
      new Column('levelId', 'level id', false),
      new Column('participantCount', 'number of participants', false),
      new Column('detectedAtFormatted', 'detected at', false),
      new Column('detectionType', 'detection type', false),
    ];
    const rows = resource.elements.map((element) => DetectionEventTable.createRow(element));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: AbstractDetectionEvent): Row<DetectionEventRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as DetectionEventRowAdapter;

    adapter.detectedAtFormatted = `${datePipe.transform(adapter.detectedAt)}`;
    return new Row(adapter);
  }

  private static createActions(de: AbstractDetectionEvent, service: DetectionEventService): RowAction[] {
    return [...this.createStateActions(de, service)];
  }

  private static createStateActions(de: AbstractDetectionEvent, service: DetectionEventService): RowAction[] {
    return [
      new RowAction(
        'showDetail',
        'Show Event Detail',
        'run',
        'primary',
        'Show detection event detailed information',
        of(false),
        defer(() => service.toDetectionEventDetail(de.trainingInstanceId, de.cheatingDetectionId, de.id))
      ),
    ];
  }
}
