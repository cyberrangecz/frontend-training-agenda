import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Phase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-model-simulator',
  templateUrl: './model-simulator.component.html',
  styleUrls: ['./model-simulator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelSimulatorComponent {
  @Input() phases: Phase[];
}
