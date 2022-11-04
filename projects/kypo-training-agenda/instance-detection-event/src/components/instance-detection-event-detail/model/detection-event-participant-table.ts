import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { Column, SentinelTable, Row } from '@sentinel/components/table';
import { DetectionEventParticipant } from '@muni-kypo-crp/training-model';

import { DetectionEventParticipantRowAdapter } from './detection-event-participant-row-adapter';

/**
 * @dynamic
 */
export class DetectionEventParticipantTable extends SentinelTable<DetectionEventParticipantRowAdapter> {
  constructor(resource: PaginatedResource<DetectionEventParticipant>) {
    const columns = [
      new Column('playerName', 'player name', false),
      new Column('occurredAtFormatted', 'occurred at', false),
      new Column('ipAddress', 'ip address', false),
      new Column('solvedInTime', 'solved in time', false),
    ];
    const rows = resource.elements.map((element) => DetectionEventParticipantTable.createRow(element));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: DetectionEventParticipant): Row<DetectionEventParticipantRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as DetectionEventParticipantRowAdapter;
    adapter.occurredAtFormatted = `${datePipe.transform(adapter.occurredAt)}`;

    return new Row(adapter);
  }
}
