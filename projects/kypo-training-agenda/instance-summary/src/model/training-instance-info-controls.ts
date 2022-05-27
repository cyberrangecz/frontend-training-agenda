import { EventEmitter } from '@angular/core';
import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, EMPTY, Observable } from 'rxjs';

/**
 * @dynamic
 */
export class TrainingInstanceInfoControls {
  static readonly PROGRESS_ACTION_ID = 'progress';
  static readonly RESULTS_ACTION_ID = 'results';
  static readonly RESULTS_AGGREGATED_ID = 'stacked_bar_chart';

  static create(
    showProgressEmitter: EventEmitter<boolean>,
    showResultsEmitter: EventEmitter<boolean>,
    disabled$: Observable<boolean>
  ): SentinelControlItem[] {
    return [
      new SentinelControlItem(
        this.PROGRESS_ACTION_ID,
        'Show Progress',
        'primary',
        disabled$,
        defer(() => {
          showProgressEmitter.emit(true);
          return EMPTY;
        })
      ),
      new SentinelControlItem(
        this.RESULTS_ACTION_ID,
        'Show Results',
        'primary',
        disabled$,
        defer(() => {
          showResultsEmitter.emit(false);
          return EMPTY;
        })
      ),
      new SentinelControlItem(
        this.RESULTS_AGGREGATED_ID,
        'Show Aggregated Results',
        'primary',
        disabled$,
        defer(() => {
          showResultsEmitter.emit(false);
          return EMPTY;
        })
      ),
    ];
  }
}
