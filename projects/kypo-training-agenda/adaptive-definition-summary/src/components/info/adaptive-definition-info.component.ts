import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-adaptive-definition-info',
  templateUrl: './adaptive-definition-info.component.html',
  styleUrls: ['./adaptive-definition-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveDefinitionInfoComponent {
  @Input() trainingDefinition: TrainingDefinition;
}
