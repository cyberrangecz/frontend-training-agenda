import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AssessmentLevel } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { AssessmentTypeEnum } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-assessment-level-detail',
  templateUrl: './assessment-level-detail.component.html',
  styleUrls: ['./assessment-level-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentLevelDetailComponent extends SentinelBaseDirective {
  @Input() level: AssessmentLevel;

  isTest(): boolean {
    return this.level.assessmentType === AssessmentTypeEnum.Test;
  }
}
