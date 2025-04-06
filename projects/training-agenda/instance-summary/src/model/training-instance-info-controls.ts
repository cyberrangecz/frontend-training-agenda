import { EventEmitter } from '@angular/core';
import { SentinelControlItem } from '@sentinel/components/controls';
import { defer, EMPTY, Observable } from 'rxjs';

/**
 * @dynamic
 */
export class TrainingInstanceInfoControls {
    static create(
        controls: { title: string; id: string }[],
        controlClicked: EventEmitter<string>,
        disabled$: Observable<boolean>,
    ): SentinelControlItem[] {
        return controls.map(
            (control) =>
                new SentinelControlItem(
                    control.id,
                    control.title,
                    'primary',
                    disabled$,
                    defer(() => {
                        controlClicked.emit(control.id);
                        return EMPTY;
                    }),
                ),
        );
    }
}
