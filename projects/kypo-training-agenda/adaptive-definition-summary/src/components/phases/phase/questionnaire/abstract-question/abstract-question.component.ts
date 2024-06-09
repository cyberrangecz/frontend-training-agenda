import { Component, Input } from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum, QuestionTypeEnum } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-question-detail',
  templateUrl: './abstract-question.component.html',
  styleUrls: ['./abstract-question.component.css'],
})
export class AbstractQuestionComponent {
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;

  readonly QuestionTypeEnum = QuestionTypeEnum;
}
