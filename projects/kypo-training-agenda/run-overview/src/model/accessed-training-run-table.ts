import { PaginatedResource } from '@sentinel/common';
import {
  AccessedTrainingRun,
  TraineeAccessTrainingRunActionEnum,
  TrainingRunTypeEnum,
} from '@muni-kypo-crp/training-model';
import { Column, Row, RowAction, SentinelTable } from '@sentinel/components/table';
import { defer, EMPTY, of } from 'rxjs';
import { AccessedTrainingRunService } from '../services/state/training/accessed-training-run.service';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class AccessedTrainingRunTable extends SentinelTable<AccessedTrainingRun> {
  constructor(resource: PaginatedResource<AccessedTrainingRun>, service: AccessedTrainingRunService) {
    const columns = [
      new Column('trainingInstanceTitle', 'title', false),
      new Column('trainingInstanceFormattedDuration', 'Date', false),
      new Column('completedLevels', 'Completed Levels', false),
    ];

    const rows = resource.elements.map(
      (trainingRun) => new Row(trainingRun, AccessedTrainingRunTable.createActions(trainingRun, service))
    );
    super(rows, columns);
    this.pagination = resource.pagination;
    this.filterable = false;
    this.selectable = false;
  }

  private static createActions(trainingRun: AccessedTrainingRun, service: AccessedTrainingRunService): RowAction[] {
    return [
      new RowAction(
        'resume',
        'Resume',
        'open_in_new',
        'primary',
        'Resume training run',
        of(trainingRun.action !== TraineeAccessTrainingRunActionEnum.Resume),
        defer(() =>
          trainingRun.type === TrainingRunTypeEnum.LINEAR
            ? service.resumeLinear(trainingRun.trainingRunId)
            : service.resumeAdaptive(trainingRun.trainingRunId)
        )
      ),
      new RowAction(
        'results',
        'Access Results',
        'assessment',
        'primary',
        'Access Results',
        of(trainingRun.action !== TraineeAccessTrainingRunActionEnum.Results),
        defer(() => {
          switch (trainingRun.type) {
            case TrainingRunTypeEnum.LINEAR:
              service.resultsLinear(trainingRun.trainingRunId);
              break;
            case TrainingRunTypeEnum.ADAPTIVE:
              service.resultsAdaptive(trainingRun.trainingRunId);
              break;
          }
          return EMPTY;
        })
      ),
    ];
  }
}
