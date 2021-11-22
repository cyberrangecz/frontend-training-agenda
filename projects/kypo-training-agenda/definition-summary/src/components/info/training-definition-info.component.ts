import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-training-definition-info',
  templateUrl: './training-definition-info.component.html',
  styleUrls: ['./training-definition-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDefinitionInfoComponent extends SentinelBaseDirective {
  @Input() trainingDefinition: TrainingDefinition;
}
