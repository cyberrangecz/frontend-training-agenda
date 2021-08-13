import { SentinelControlItem } from '@sentinel/components/controls';
import { combineLatest, defer, Observable } from 'rxjs';
import { TrainingDefinitionEditService } from '../../services/state/edit/training-definition-edit.service';
import { map } from 'rxjs/operators';

/**
 * @dynamic
 */
export class TrainingDefinitionEditControls {
  static readonly SAVE_ACTION_ID = 'save';

  static create(
    service: TrainingDefinitionEditService,
    definitionSaveDisabled$: Observable<boolean>,
    levelSaveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return this.editModeControls(service, definitionSaveDisabled$, levelSaveDisabled$);
  }

  private static editModeControls(
    service: TrainingDefinitionEditService,
    definitionSaveDisabled$: Observable<boolean>,
    levelSaveDisabled$: Observable<boolean>
  ): SentinelControlItem[] {
    const saveDisabled$: Observable<boolean> = combineLatest(definitionSaveDisabled$, levelSaveDisabled$).pipe(
      map((save) => save[0] && save[1])
    );
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
