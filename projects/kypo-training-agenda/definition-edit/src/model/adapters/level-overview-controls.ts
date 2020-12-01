import {
  SentinelControlItem,
  SentinelControlMenuItem,
  SentinelExpandableControlItem,
} from '@sentinel/components/controls';
import { AbstractLevelTypeEnum } from '@kypo/training-model';
import { defer, Observable, of } from 'rxjs';
import { LevelEditService } from '../../services/state/level/level-edit.service';

/**
 * @dynamic
 */
export class LevelOverviewControls {
  static readonly ADD_ACTION_ID = 'add';
  static readonly DELETE_ACTION_ID = 'delete';
  static readonly SAVE_ACTION_ID = 'save';
  static readonly ADD_GAME_LEVEL_ID = 'add_game_level';
  static readonly ADD_ASSESSMENT_LEVEL_ID = 'add_assessment_level';
  static readonly ADD_INFO_LEVEL_ID = 'add_info_level';

  static create(
    service: LevelEditService,
    saveDisabled$: Observable<boolean>,
    deleteDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return [
      new SentinelExpandableControlItem(
        this.ADD_ACTION_ID,
        'Add',
        'primary',
        of(false),
        this.createAddExpandedMenuControlButtons(service)
      ),
      new SentinelControlItem(
        this.DELETE_ACTION_ID,
        'Delete',
        'warn',
        deleteDisabled$,
        defer(() => service.deleteSelected())
      ),
      new SentinelControlItem(
        this.SAVE_ACTION_ID,
        'Save',
        'primary',
        saveDisabled$,
        defer(() => service.saveSelected())
      ),
    ];
  }

  private static createAddExpandedMenuControlButtons(service: LevelEditService): SentinelControlMenuItem[] {
    return [
      new SentinelControlMenuItem(
        this.ADD_GAME_LEVEL_ID,
        'Game Level',
        'primary',
        of(false),
        defer(() => service.add(AbstractLevelTypeEnum.Game)),
        'videogame_asset'
      ),
      new SentinelControlMenuItem(
        this.ADD_ASSESSMENT_LEVEL_ID,
        'Assessment Level',
        'primary',
        of(false),
        defer(() => service.add(AbstractLevelTypeEnum.Assessment)),
        'assignment'
      ),
      new SentinelControlMenuItem(
        this.ADD_INFO_LEVEL_ID,
        'Info Level',
        'primary',
        of(false),
        defer(() => service.add(AbstractLevelTypeEnum.Info)),
        'info'
      ),
    ];
  }
}
