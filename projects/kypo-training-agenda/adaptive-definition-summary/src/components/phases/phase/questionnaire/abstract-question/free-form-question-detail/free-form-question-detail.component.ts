import { Component, Input } from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-free-form-question-detail',
  templateUrl: './free-form-question-detail.component.html',
  styleUrls: ['./free-form-question-detail.component.css'],
})
export class FreeFormQuestionDetailComponent {
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;

  readonly QuestionnaireTypeEnum = QuestionnaireTypeEnum;
}
