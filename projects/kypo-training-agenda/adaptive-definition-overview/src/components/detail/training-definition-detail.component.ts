import { Component, Input } from '@angular/core';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-training-definition-detail',
  templateUrl: './training-definition-detail.component.html',
  styleUrls: ['./training-definition-detail.component.scss'],
})
/**
 * Detail of training definition for overview table component. Displays detailed information about training definition
 */
export class TrainingDefinitionDetailComponent {
  @Input() data: TrainingDefinition;
}
