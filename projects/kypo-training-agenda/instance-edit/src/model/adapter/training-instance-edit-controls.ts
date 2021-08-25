import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, Observable } from 'rxjs';
import { TrainingInstanceEditService } from '../../services/state/edit/training-instance-edit.service';

/**
 * @dynamic
 */
export class TrainingInstanceEditControls {
  static readonly SAVE_ACTION_ID = 'save';

  static create(service: TrainingInstanceEditService, saveDisabled$: Observable<boolean>): SentinelControlItem[] {
    return TrainingInstanceEditControls.createControls(service, saveDisabled$);
  }

  private static createControls(
    service: TrainingInstanceEditService,
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
