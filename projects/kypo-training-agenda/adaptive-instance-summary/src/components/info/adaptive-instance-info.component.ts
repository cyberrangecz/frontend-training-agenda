import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { TrainingInstance } from '@muni-kypo-crp/training-model';

/**
 * Component for displaying basic info about selected training instance.
 */
@Component({
  selector: 'kypo-training-instance-info',
  templateUrl: './adaptive-instance-info.component.html',
  styleUrls: ['./adaptive-instance-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceInfoComponent extends SentinelBaseDirective implements OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() accessTokenLink: string;
  @Input() poolIdLink: string;
  @Input() hasPool: boolean;
  trainingDefinition: TrainingDefinition;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes && this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
    }
  }
}
