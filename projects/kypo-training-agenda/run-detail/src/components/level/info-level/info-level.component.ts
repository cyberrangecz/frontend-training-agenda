import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { InfoLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-level',
  templateUrl: './info-level.component.html',
  styleUrls: ['./info-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component to display training run's level of type INFO. Only displays markdown and allows user to continue immediately.
 */
export class InfoLevelComponent extends SentinelBaseDirective {
  @Input() level: InfoLevel;
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor() {
    super();
  }

  onNext(): void {
    this.next.emit();
  }
}
