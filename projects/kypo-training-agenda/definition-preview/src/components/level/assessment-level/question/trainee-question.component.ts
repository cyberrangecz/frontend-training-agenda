import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { ExtendedMatchingItems } from '@muni-kypo-crp/training-model';
import { FreeFormQuestion } from '@muni-kypo-crp/training-model';
import { MultipleChoiceQuestion } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-trainee-question',
  templateUrl: './trainee-question.component.html',
  styleUrls: ['./trainee-question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Wrapper component for displaying questions in training run's assessment level. It selects the correct component to
 * display based on the question type.
 */
export class TraineeQuestionComponent extends SentinelBaseDirective implements OnInit {
  @Input() question: Question;
  @Input() index: number;

  isEmi = false;
  isFfq = false;
  isMcq = false;

  ngOnInit(): void {
    this.resolveQuestionType();
  }

  /**
   * Resolves type of question to create appropriate child component
   */
  private resolveQuestionType() {
    this.isEmi = this.question instanceof ExtendedMatchingItems;
    this.isFfq = this.question instanceof FreeFormQuestion;
    this.isMcq = this.question instanceof MultipleChoiceQuestion;
  }
}
