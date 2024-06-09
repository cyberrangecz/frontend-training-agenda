import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-training-definition-info',
  templateUrl: './training-definition-info.component.html',
  styleUrls: ['./training-definition-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDefinitionInfoComponent {
  @Input() trainingDefinition: TrainingDefinition;
}
