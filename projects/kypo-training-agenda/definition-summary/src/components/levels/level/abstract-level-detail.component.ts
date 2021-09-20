import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractLevelTypeEnum, Level } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-level-detail',
  templateUrl: './abstract-level-detail.component.html',
  styleUrls: ['./abstract-level-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractLevelDetailComponent extends SentinelBaseDirective {
  @Input() level: Level;

  levelTypes = AbstractLevelTypeEnum;
}
