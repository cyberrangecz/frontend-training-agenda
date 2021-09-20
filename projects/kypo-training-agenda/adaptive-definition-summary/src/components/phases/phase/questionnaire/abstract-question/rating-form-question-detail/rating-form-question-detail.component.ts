import { Component, Input } from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-rating-form-question-detail',
  templateUrl: './rating-form-question-detail.component.html',
  styleUrls: ['./rating-form-question-detail.component.css'],
})
export class RatingFormQuestionDetailComponent {
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;

  readonly QuestionnaireTypeEnum = QuestionnaireTypeEnum;
}
