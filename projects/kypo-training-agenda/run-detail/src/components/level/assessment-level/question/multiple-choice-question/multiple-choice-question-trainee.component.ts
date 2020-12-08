import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SentinelBaseDirective } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { MultipleChoiceQuestion } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-trainee-multiple-choice-question',
  templateUrl: './multiple-choice-question-trainee.component.html',
  styleUrls: ['./multiple-choice-question-trainee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component displaying MCQ type of question in the assessment level of a trainees training run.
 * If is assessment is a test or question is required, it needs to be filled, otherwise it is optional.
 */
export class MultipleChoiceQuestionTraineeComponent extends SentinelBaseDirective {
  @Input() question: MultipleChoiceQuestion;
  @Input() index: number;

  @Output() contentChanged: EventEmitter<{ index: number; question: Question }> = new EventEmitter();

  userAnswersIndexes: number[] = [];

  /**
   * Checks whether mandatory questions were answered
   */
  canBeSubmitted(): boolean {
    return !this.question.required || this.userAnswersIndexes.length > 0;
  }

  /**
   * Saves changes from user input to question object
   */
  saveChanges(): void {
    this.question.usersAnswersIndices = this.userAnswersIndexes;
  }

  /**
   * Called when user changed the answer (clicked on a checkbox
   * @param event event of checkbox change
   * @param index index of an answer which has been changed
   */
  onAnswerChanged(event: MatCheckboxChange, index: number): void {
    if (event.checked) {
      this.addCorrectAnswer(index);
    } else {
      this.removeCorrectAnswer(index);
    }
    this.contentChanged.emit({
      index: this.index,
      question: this.question,
    });
  }

  /**
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.userAnswersIndexes.push(index);
  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.userAnswersIndexes.indexOf(index);
    if (indexToRemove !== -1) {
      this.userAnswersIndexes.splice(indexToRemove, 1);
    }
  }
}
