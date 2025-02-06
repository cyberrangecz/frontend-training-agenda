import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractPhaseTypeEnum, Phase } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-phase-detail',
  templateUrl: './abstract-phase-detail.component.html',
  styleUrls: ['./abstract-phase-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractPhaseDetailComponent {
  @Input() phase: Phase;

  readonly AbstractPhaseTypeEnum = AbstractPhaseTypeEnum;
}
