import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AbstractPhaseTypeEnum, Phase } from '@muni-kypo-crp/training-model';

/**
 * Component to display one level in a training run. Serves mainly as a wrapper which determines the type of the training
 * and displays child component accordingly
 */
@Component({
  selector: 'kypo-abstract-phase',
  templateUrl: './abstract-phase.component.html',
  styleUrls: ['./abstract-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractPhaseComponent extends SentinelBaseDirective {
  @Input() phase: Phase;
  @Input() isLast: boolean;
  @Input() isLoading = false;
  @Input() sandboxId: number;

  @Output() next: EventEmitter<void> = new EventEmitter();
  phaseTypes = AbstractPhaseTypeEnum;

  constructor() {
    super();
  }

  onNext(): void {
    this.next.emit();
  }
}
