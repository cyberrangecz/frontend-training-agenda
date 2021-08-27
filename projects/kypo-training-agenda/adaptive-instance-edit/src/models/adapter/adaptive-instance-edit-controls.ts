import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, Observable } from 'rxjs';
import { AdaptiveInstanceEditService } from '../../services/state/edit/adaptive-instance-edit.service';

/**
 * @dynamic
 */
export class AdaptiveInstanceEditControls {
  static readonly SAVE_ACTION_ID = 'save';

  static create(service: AdaptiveInstanceEditService, saveDisabled$: Observable<boolean>): SentinelControlItem[] {
    return this.createControls(service, saveDisabled$);
  }

  private static createControls(
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
