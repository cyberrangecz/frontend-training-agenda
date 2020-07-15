import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, of } from 'rxjs';
import { TrainingDefinitionService } from '../services/state/training-definition.service';

/**
 * @dynamic
 */
export class TrainingDefinitionOverviewControls {
  static readonly CREATE_ACTION_ID = 'create';
  static readonly UPLOAD_ACTION_ID = 'upload';

  static create(service: TrainingDefinitionService): SentinelControlItem[] {
    return [
      new SentinelControlItem(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
        of(false),
        defer(() => service.create())
      ),
      new SentinelControlItem(
        this.UPLOAD_ACTION_ID,
        'Upload',
        'primary',
        of(false),
        defer(() => service.upload())
      ),
    ];
  }
}
