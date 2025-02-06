import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractLevelTypeEnum, Level } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-level-detail',
  templateUrl: './abstract-level-detail.component.html',
  styleUrls: ['./abstract-level-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractLevelDetailComponent {
  @Input() level: Level;

  levelTypes = AbstractLevelTypeEnum;
}
