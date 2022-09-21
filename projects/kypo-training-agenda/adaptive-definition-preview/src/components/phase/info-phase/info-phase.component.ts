import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  constructor() {
    super();
  }
}
