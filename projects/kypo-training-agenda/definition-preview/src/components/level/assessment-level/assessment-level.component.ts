import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AssessmentLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-assessment-level',
  templateUrl: './assessment-level.component.html',
  styleUrls: ['./assessment-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentLevelComponent extends SentinelBaseDirective {
  @Input() level: AssessmentLevel;

  constructor() {
    super();
  }
}
