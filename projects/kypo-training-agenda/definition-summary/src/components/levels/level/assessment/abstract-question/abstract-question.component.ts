import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ExtendedMatchingItems,
  FreeFormQuestion,
  MultipleChoiceQuestion,
  Question,
} from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-question-detail',
  templateUrl: './abstract-question.component.html',
  styleUrls: ['./abstract-question.component.css'],
})
export class AbstractQuestionComponent extends SentinelBaseDirective implements OnChanges {
  @Input() question: Question;
  @Input() isTest: boolean;

  isFfq = false;
  isMcq = false;
  isEmi = false;

  freeFormQuestion = FreeFormQuestion;
  multipleChoiceQuestion = MultipleChoiceQuestion;
  extendedMatchingItems = ExtendedMatchingItems;

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.resolveQuestionType();
    }
  }

  private resolveQuestionType() {
    this.isFfq = this.question instanceof FreeFormQuestion;
    this.isEmi = this.question instanceof ExtendedMatchingItems;
    this.isMcq = this.question instanceof MultipleChoiceQuestion;
  }
}
