import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-adaptive-definition-info',
  templateUrl: './adaptive-definition-info.component.html',
  styleUrls: ['./adaptive-definition-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveDefinitionInfoComponent extends SentinelBaseDirective {
  @Input() trainingDefinition: TrainingDefinition;
}
