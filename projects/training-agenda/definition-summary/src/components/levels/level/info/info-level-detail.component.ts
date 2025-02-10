import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoLevel } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'crczp-info-level-detail',
  templateUrl: './info-level-detail.component.html',
  styleUrls: ['./info-level-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLevelDetailComponent {
  @Input() level: InfoLevel;
}
