import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { Column, SentinelTable, Row, RowAction } from '@sentinel/components/table';
import { AbstractDetectionEvent, AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';
import { DetectionEventRowAdapter } from './detection-event-row-adapter';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { defer, of } from 'rxjs';
import { DetectionEventService } from '../services/detection-event.service';

/**
 * Helper class transforming paginated resource to class for common table component
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
      new Column('detectionEventTypeFormatted', 'detection type', false),
    ];
    const rows = resource.elements.map((element) => DetectionEventTable.createRow(element, service));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(
    element: AbstractDetectionEvent,
    service: DetectionEventService
  ): Row<DetectionEventRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as DetectionEventRowAdapter;

    adapter.detectedAtFormatted = `${datePipe.transform(adapter.detectedAt)}`;
    adapter.detectionEventTypeFormatted = this.evaluateEventTypeString(adapter.detectionEventType);
    return new Row(adapter, this.createActions(element, service));
  }

  private static evaluateEventTypeString(type: AbstractDetectionEventTypeEnum): string {
    switch (type) {
      case AbstractDetectionEventTypeEnum.Answer_similarity:
        return 'Answer similarity';
      case AbstractDetectionEventTypeEnum.Location_similarity:
        return 'Location similarity';
      case AbstractDetectionEventTypeEnum.Time_proximity:
        return 'Time proximity';
      case AbstractDetectionEventTypeEnum.Minimal_solve_time:
        return 'Minimal solve time';
      case AbstractDetectionEventTypeEnum.No_commands:
        return 'No commands';
      case AbstractDetectionEventTypeEnum.Forbidden_commands:
        return 'Forbidden commands';
      default:
        return 'Undefined';
    }
  }
  private static createActions(de: AbstractDetectionEvent, service: DetectionEventService): RowAction[] {
    return [...this.createStateActions(de, service)];
  }

  private static createStateActions(de: AbstractDetectionEvent, service: DetectionEventService): RowAction[] {
    return [
      new RowAction(
        'showDetail',
        'Show Event Detail',
        'assessment',
        'primary',
        'Show detection event detailed information',
        of(false),
        defer(() => service.toDetectionEventDetail(de.trainingInstanceId, de.cheatingDetectionId, de.id))
      ),
    ];
  }
}
