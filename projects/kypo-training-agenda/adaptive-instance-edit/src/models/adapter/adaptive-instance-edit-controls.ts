import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, Observable } from 'rxjs';
import { AdaptiveInstanceEditService } from '../../services/state/edit/adaptive-instance-edit.service';

/**
 * @dynamic
 */
export class AdaptiveInstanceEditControls {
  static readonly SAVE_ACTION_ID = 'save';
  static readonly SAVE_AND_STAY_ACTION_ID = 'save_and_stay';

  static create(
    service: AdaptiveInstanceEditService,
    isEditMode: boolean,
    saveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return isEditMode ? this.editModeControls(service, saveDisabled$) : this.createModeControls(service, saveDisabled$);
  }

  private static createModeControls(
    service: AdaptiveInstanceEditService,
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

  private static editModeControls(
    service: AdaptiveInstanceEditService,
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
}
