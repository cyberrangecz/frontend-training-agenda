import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractPhaseTypeEnum, Phase } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-phase-detail',
  templateUrl: './abstract-phase-detail.component.html',
  styleUrls: ['./abstract-phase-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractPhaseDetailComponent extends SentinelBaseDirective {
  @Input() phase: Phase;

  readonly AbstractPhaseTypeEnum = AbstractPhaseTypeEnum;
}
