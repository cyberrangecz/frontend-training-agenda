import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AbstractLevelTypeEnum } from '@kypo/training-model';
import { Level } from '@kypo/training-model';

/**
 * Component to display one level in a training run. Serves mainly as a wrapper which determines the type of the training
 * and displays child component accordingly
 */
@Component({
  selector: 'kypo-abstract-level',
  templateUrl: './abstract-level.component.html',
  styleUrls: ['./abstract-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractLevelComponent extends SentinelBaseDirective implements OnInit {
  @Input() level: Level;
  @Input() isLast: boolean;
  @Input() sandboxId: number;

  @Output() next: EventEmitter<void> = new EventEmitter();
  levelTypes = AbstractLevelTypeEnum;

  constructor() {
    super();
  }

  ngOnInit() {}

  onNext() {
    this.next.emit();
  }
}
