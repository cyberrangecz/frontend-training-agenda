import { KypoControlItem } from 'kypo-controls';
import { TrainingInstance } from 'kypo-training-model';
import { defer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoolAssignService } from '../../../../services/training-instance/pool-assign/pool-assign.service';

/**
 * @dynamic
 */
export class PoolAssignControls {
  static create(service: PoolAssignService, trainingInstance: TrainingInstance): KypoControlItem[] {
    if (trainingInstance.hasPool()) {
      return [
        new KypoControlItem(
          'unassign',
          'Unassign',
          'primary',
          of(false),
          defer(() => service.unassign(trainingInstance))
        ),
      ];
    } else {
      const assignDisabled$ = service.selected$.pipe(map((selected) => selected === undefined));
      return [
        new KypoControlItem(
          'assign',
          'Assign',
          'primary',
          assignDisabled$,
          defer(() => service.assign(trainingInstance))
        ),
      ];
    }
  }
}
