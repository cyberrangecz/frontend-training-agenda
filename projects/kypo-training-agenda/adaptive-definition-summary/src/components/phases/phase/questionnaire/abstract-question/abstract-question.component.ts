import { Component, Input } from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum, QuestionTypeEnum } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-question-detail',
  templateUrl: './abstract-question.component.html',
  styleUrls: ['./abstract-question.component.css'],
})
export class AbstractQuestionComponent extends SentinelBaseDirective {
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;

  readonly QuestionTypeEnum = QuestionTypeEnum;
}
