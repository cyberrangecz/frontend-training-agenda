import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance } from '@kypo/training-model';
import { defer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoolAssignService } from '../../services/state/pool-assign/pool-assign.service';

/**
 * @dynamic
 */
export class PoolAssignControls {
  static create(service: PoolAssignService, trainingInstance: TrainingInstance): SentinelControlItem[] {
    if (trainingInstance.hasPool()) {
      return [
        new SentinelControlItem(
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
        new SentinelControlItem(
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
