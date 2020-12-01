import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { InfoLevel } from '@kypo/training-model';

@Component({
  selector: 'kypo-info-level',
  templateUrl: './info-level.component.html',
  styleUrls: ['./info-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component to display training run's level of type INFO. Only displays markdown and allows user to continue immediately.
 */
export class InfoLevelComponent extends SentinelBaseDirective implements OnInit {
  @Input() level: InfoLevel;
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {}

  onNext() {
    this.next.emit();
  }
}
