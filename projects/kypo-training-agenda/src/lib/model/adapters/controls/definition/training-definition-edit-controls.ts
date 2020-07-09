import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, Observable } from 'rxjs';
import { TrainingDefinitionEditService } from '../../../../services/training-definition/edit/training-definition-edit.service';

/**
 * @dynamic
 */
export class TrainingDefinitionEditControls {
  static readonly SAVE_ACTION_ID = 'save';
  static readonly SAVE_AND_STAY_ACTION_ID = 'save_and_stay';

  static create(
    service: TrainingDefinitionEditService,
    isEditMode: boolean,
    saveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return isEditMode ? this.editModeControls(service, saveDisabled$) : this.createModeControls(service, saveDisabled$);
  }

  private static editModeControls(
    service: TrainingDefinitionEditService,
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
    service: TrainingDefinitionEditService,
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
