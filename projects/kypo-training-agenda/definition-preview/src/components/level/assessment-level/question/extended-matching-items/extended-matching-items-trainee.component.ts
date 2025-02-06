import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExtendedMatchingItems } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-trainee-extended-matching-items',
  templateUrl: './extended-matching-items-trainee.component.html',
  styleUrls: ['./extended-matching-items-trainee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendedMatchingItemsTraineeComponent {
  @Input() question: ExtendedMatchingItems;
  @Input() index: number;
}
