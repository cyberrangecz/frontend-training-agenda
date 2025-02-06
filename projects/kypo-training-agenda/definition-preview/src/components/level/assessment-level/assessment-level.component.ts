import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AssessmentLevel } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-assessment-level',
  templateUrl: './assessment-level.component.html',
  styleUrls: ['./assessment-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentLevelComponent {
  @Input() level: AssessmentLevel;
}
