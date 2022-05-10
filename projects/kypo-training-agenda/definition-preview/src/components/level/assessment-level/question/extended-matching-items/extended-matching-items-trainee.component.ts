import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { ExtendedMatchingItems } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-trainee-extended-matching-items',
  templateUrl: './extended-matching-items-trainee.component.html',
  styleUrls: ['./extended-matching-items-trainee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendedMatchingItemsTraineeComponent extends SentinelBaseDirective {
  @Input() question: ExtendedMatchingItems;
  @Input() index: number;
}
