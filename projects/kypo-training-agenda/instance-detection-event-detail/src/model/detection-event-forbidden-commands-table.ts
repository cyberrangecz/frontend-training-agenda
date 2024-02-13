import { PaginatedResource } from '@sentinel/common/pagination';
import { Column, SentinelTable, Row } from '@sentinel/components/table';
import { DetectedForbiddenCommand, DetectionEventParticipant } from '@muni-kypo-crp/training-model';
import { DetectionEventParticipantRowAdapter } from './detection-event-participant-row-adapter';
import { DatePipe } from '@angular/common';
import { DetectionEventForbiddenCommandsRowAdapter } from './detection-event-forbidden-commands-row-adapter';

/**
 * @dynamic
 */
export class DetectionEventForbiddenCommandsTable extends SentinelTable<DetectedForbiddenCommand> {
  constructor(resource: PaginatedResource<DetectedForbiddenCommand>) {
    const columns = [new Column('command', 'command', false), new Column('type', 'type', false)];
    const rows = resource.elements.map((element) => DetectionEventForbiddenCommandsTable.createRow(element));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(element: DetectedForbiddenCommand): Row<DetectionEventForbiddenCommandsRowAdapter> {
    const adapter = element as DetectionEventForbiddenCommandsRowAdapter;
    return new Row(adapter);
  }
}
