import { PaginatedResource } from '@sentinel/common/pagination';
import { Column, SentinelTable, Row } from '@sentinel/components/table';
import { DetectedForbiddenCommand, DetectionEventParticipant } from '@muni-kypo-crp/training-model';
import { DetectionEventParticipantRowAdapter } from './detection-event-participant-row-adapter';
import { DatePipe } from '@angular/common';
import { DetectionEventForbiddenCommandsRowAdapter } from './detection-event-forbidden-commands-row-adapter';

/**
 * @dynamic
 */
export class DetectionEventForbiddenCommandsTable extends SentinelTable<DetectionEventForbiddenCommandsRowAdapter> {
  constructor(resource: PaginatedResource<DetectedForbiddenCommand>) {
    const columns = [
      new Column('command', 'command', false),
      new Column('type', 'type', false),
      new Column('hostname', 'hostname', false),
      new Column('occurredAtFormatted', 'occurredAt', false),
    ];
    const rows = resource.elements.map((element) => DetectionEventForbiddenCommandsTable.createRow(element));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: DetectedForbiddenCommand): Row<DetectionEventForbiddenCommandsRowAdapter> {
    const datePipe = new DatePipe('en-EN');
    const adapter = element as DetectionEventForbiddenCommandsRowAdapter;
    adapter.occurredAtFormatted = `${datePipe.transform(adapter.occurredAt, 'medium')}`;

    return new Row(adapter);
  }
}
