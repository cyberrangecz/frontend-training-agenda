import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, Observable } from 'rxjs';
import { AdaptiveDefinitionEditService } from '../../services/state/edit/adaptive-definition-edit.service';

/**
 * @dynamic
 */
export class TrainingDefinitionEditControls {
  static readonly SAVE_ACTION_ID = 'save';
  static readonly SAVE_AND_STAY_ACTION_ID = 'save_and_stay';

  static create(
    service: AdaptiveDefinitionEditService,
    isEditMode: boolean,
    saveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return isEditMode ? this.editModeControls(service, saveDisabled$) : this.createModeControls(service, saveDisabled$);
  }

  private static editModeControls(
    service: AdaptiveDefinitionEditService,
    saveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return [
      new SentinelControlItem(
        this.SAVE_ACTION_ID,
        'Save',
        'primary',
        saveDisabled$,
        defer(() => service.save())
      ),
    ];
  }

  private static createModeControls(
    service: AdaptiveDefinitionEditService,
    saveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return [
      new SentinelControlItem(
        this.SAVE_ACTION_ID,
        'Create',
        'primary',
        saveDisabled$,
        defer(() => service.save())
      ),
      new SentinelControlItem(
        this.SAVE_AND_STAY_ACTION_ID,
        'Create and continue editing',
        'primary',
        saveDisabled$,
        defer(() => service.createAndStay())
      ),
    ];
  }
}
