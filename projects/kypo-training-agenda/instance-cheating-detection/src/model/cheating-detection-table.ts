import { PaginatedResource, SentinelDateTimeFormatPipe } from '@sentinel/common';
import { Column, SentinelTable, Row, RowAction, DeleteAction, DownloadAction } from '@sentinel/components/table';
import { CheatingDetection, CheatingDetectionStateEnum } from '@muni-kypo-crp/training-model';
import { CheatingDetectionRowAdapter } from './cheating-detection-row-adapter';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { CheatingDetectionService } from '../services/cheating-detection.service';
import { defer, of } from 'rxjs';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class CheatingDetectionTable extends SentinelTable<CheatingDetectionRowAdapter> {
  constructor(
    resource: PaginatedResource<CheatingDetection>,
    service: CheatingDetectionService,
    navigator: TrainingNavigator
  ) {
    const columns = [
      new Column('id', 'id', false),
      new Column('executeTimeFormatted', 'executed at', false),
      new Column('executedBy', 'executed by', false),
      new Column('currentState', 'state', false),
      new Column('resultsFormatted', 'results', false),
      new Column('stages', 'stages', false),
    ];
    const rows = resource.elements.map((element) => CheatingDetectionTable.createRow(element, service, navigator));
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
  }

  private static createRow(
    element: CheatingDetection,
    service: CheatingDetectionService,
    navigator: TrainingNavigator
  ): Row<CheatingDetectionRowAdapter> {
    const datePipe = new SentinelDateTimeFormatPipe('en-EN');
    const adapter = element as CheatingDetectionRowAdapter;

    adapter.resultsFormatted =
      adapter.currentState === CheatingDetectionStateEnum.Finished ? adapter.results.toString() : null;
    adapter.executeTimeFormatted = `${datePipe.transform(adapter.executeTime)}`;
    adapter.stages = this.requestStageResolver(element);
    return new Row(adapter, this.createActions(element, service));
  }

  private static createActions(cd: CheatingDetection, service: CheatingDetectionService): RowAction[] {
    return [...this.createStateActions(cd, service)];
  }

  private static createStateActions(cd: CheatingDetection, service: CheatingDetectionService): RowAction[] {
    switch (cd.currentState) {
      case CheatingDetectionStateEnum.Finished:
        return [
          new RowAction(
            'runAgain',
            'Run Again',
            'run_circle',
            'primary',
            'Rerun Cheating Detection',
            of(false),
            defer(() => service.rerun(cd.id, cd.trainingInstanceId))
          ),
          new DeleteAction(
            'Delete cheating detection',
            of(false),
            defer(() => service.delete(cd.id, cd.trainingInstanceId))
          ),
          new RowAction(
            'results',
            'Results',
            'assessment',
            'primary',
            'show results',
            of(false),
            defer(() => service.toDetectionEventsOfCheatingDetection(cd.trainingInstanceId, cd.id))
          ),
          new RowAction(
            'archive',
            'Get Archive',
            'cloud_download',
            'primary',
            'Download ZIP file containing all cheating detection data',
            of(false),
            defer(() => service.download(cd.id))
          ),
        ];
      default:
        return [];
    }
  }

  private static requestStageResolver(data: CheatingDetection) {
    return [
      'Answer Similarity Detection : ' + data.answerSimilarityState,
      'Location Proximity Detection : ' + data.locationSimilarityState,
      'Time Proximity Detection : ' + data.timeProximityState,
      'Minimal Solve Time Detection : ' + data.minimalSolveTimeState,
      'No Commands Detection : ' + data.noCommandsState,
    ];
  }
}
