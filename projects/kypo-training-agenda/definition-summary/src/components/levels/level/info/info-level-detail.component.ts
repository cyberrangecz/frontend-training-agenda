import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-level-detail',
  templateUrl: './info-level-detail.component.html',
  styleUrls: ['./info-level-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLevelDetailComponent {
  @Input() level: InfoLevel;
}
