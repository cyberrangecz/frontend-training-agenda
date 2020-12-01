import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinition } from '@kypo/training-model';
import { TrainingInstance } from '@kypo/training-model';

/**
 * Component for displaying basic info about selected training instance.
 */
@Component({
  selector: 'kypo-training-instance-info',
  templateUrl: './training-instance-info.component.html',
  styleUrls: ['./training-instance-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceInfoComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() accessTokenLink: string;
  @Input() poolIdLink: string;
  @Input() hasPool: boolean;
  trainingDefinition: TrainingDefinition;

  constructor() {
    super();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes && this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
    }
  }
}
