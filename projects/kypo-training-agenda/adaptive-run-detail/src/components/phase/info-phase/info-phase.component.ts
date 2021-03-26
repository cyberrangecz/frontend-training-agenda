import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { InfoPhase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-phase',
  templateUrl: './info-phase.component.html',
  styleUrls: ['./info-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPhaseComponent extends SentinelBaseDirective {
  @Input() phase: InfoPhase;
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor() {
    super();
  }

  onNext(): void {
    this.next.emit();
  }
}
