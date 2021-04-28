import { PaginatedResource } from '@sentinel/common';
import { TrainingDefinitionStateEnum } from '@muni-kypo-crp/training-model';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import {
  Column,
  SentinelTable,
  Row,
  RowAction,
  RowExpand,
  DeleteAction,
  EditAction,
  DownloadAction,
} from '@sentinel/components/table';
import { defer, of } from 'rxjs';
import { TrainingDefinitionDetailComponent } from '../components/detail/training-definition-detail.component';
import { AdaptiveDefinitionService } from '../services/state/adaptive-definition.service';

/**
 * Helper class transforming paginated resource to class for common table component
 * @dynamic
 */
export class TrainingDefinitionTable extends SentinelTable<TrainingDefinition> {
  constructor(resource: PaginatedResource<TrainingDefinition>, service: AdaptiveDefinitionService) {
    const columns = [
      new Column('id', 'id', true),
      new Column('title', 'title', true),
      new Column('state', 'state', true),
      new Column('lastEditTimeFormatted', 'last edit', true, 'lastEdited'),
    ];

    const rows = resource.elements.map(
      (definition) => new Row(definition, TrainingDefinitionTable.createActions(definition, service))
    );
    super(rows, columns);

    this.expand = new RowExpand(TrainingDefinitionDetailComponent);
    this.pagination = resource.pagination;
    this.filterLabel = 'Filter by title';
    this.filterable = true;
    this.selectable = false;
  }

  private static createActions(td: TrainingDefinition, service: AdaptiveDefinitionService): RowAction[] {
    return [...this.createBaseActions(td, service), ...this.createStateActions(td, service)];
  }

  private static createBaseActions(td: TrainingDefinition, service: AdaptiveDefinitionService): RowAction[] {
    return [
      new EditAction(
        'Edit training definition',
        of(false),
        defer(() => service.edit(td))
      ),
      new DeleteAction(
        'Delete training definition',
        of(false),
        defer(() => service.delete(td))
      ),
      new RowAction(
        'clone',
        'Clone',
        'file_copy',
        'primary',
        'Clone training definition',
        of(false),
        defer(() => service.clone(td))
      ),
      new DownloadAction(
        'Download training definition',
        of(false),
        defer(() => service.download(td))
      ),
    ];
  }

  private static createStateActions(td: TrainingDefinition, service: AdaptiveDefinitionService): RowAction[] {
    switch (td.state) {
      case TrainingDefinitionStateEnum.Released:
        return [
          new RowAction(
            'unrelease',
            'Unrelease',
            'lock_open',
            'warn',
            'Unrelease training definition',
            of(false),
            defer(() => service.changeState(td, TrainingDefinitionStateEnum.Unreleased))
          ),
          new RowAction(
            'archive',
            'Archive',
            'archive',
            'warn',
            'Archive training definition',
            of(false),
            defer(() => service.changeState(td, TrainingDefinitionStateEnum.Archived))
          ),
        ];
      case TrainingDefinitionStateEnum.Unreleased:
        return [
          new RowAction(
            'release',
            'Release',
            'lock',
            'warn',
            'Release training definition',
            of(false),
            defer(() => service.changeState(td, TrainingDefinitionStateEnum.Released))
          ),
        ];
      default:
        return [];
    }
  }
}
