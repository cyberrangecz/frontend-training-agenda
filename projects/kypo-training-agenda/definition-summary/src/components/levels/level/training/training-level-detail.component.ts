import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrainingLevel } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-training-level-detail',
  templateUrl: './training-level-detail.component.html',
  styleUrls: ['./training-level-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLevelDetailComponent extends SentinelBaseDirective {
  @Input() level: TrainingLevel;

  getMitreTechniques(): string {
    return this.level.mitreTechniques.map((technique) => technique.techniqueKey).toString();
  }
}
