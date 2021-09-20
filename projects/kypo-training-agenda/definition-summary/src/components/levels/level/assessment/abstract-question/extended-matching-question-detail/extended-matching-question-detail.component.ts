import { Component, Input } from '@angular/core';
import { ExtendedMatchingItems } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-extended-matching-question-detail',
  templateUrl: './extended-matching-question-detail.component.html',
  styleUrls: ['./extended-matching-question-detail.component.css'],
})
export class ExtendedMatchingQuestionDetailComponent {
  @Input() question: ExtendedMatchingItems;
  @Input() isTest: boolean;
}
