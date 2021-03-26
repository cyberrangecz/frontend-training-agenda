import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, Observable } from 'rxjs';
import { AdaptiveInstanceSummaryService } from '../services/state/summary/adaptive-instance-summary.service';

/**
 * @dynamic
 */
export class AdaptiveInstanceSummaryControls {
  static readonly RESULTS_ACTION_ID = 'results';

  static create(service: AdaptiveInstanceSummaryService, resultsDisabled$: Observable<boolean>): SentinelControlItem[] {
    return [
      new SentinelControlItem(
        this.RESULTS_ACTION_ID,
        'Show Results',
        'primary',
        resultsDisabled$,
        defer(() => service.showResults())
      ),
    ];
  }
}
