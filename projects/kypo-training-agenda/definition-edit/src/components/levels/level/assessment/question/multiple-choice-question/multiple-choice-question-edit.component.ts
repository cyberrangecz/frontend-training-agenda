import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SentinelBaseDirective } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { MultipleChoiceQuestion } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { MultipleChoiceFormGroup } from './multiple-choice-question-edit-form-group';

/**
 * Component for editing a question of type Multiple Choice Question
 */
@Component({
  selector: 'kypo-multiple-choice-question-edit',
  templateUrl: './multiple-choice-question-edit.component.html',
  styleUrls: ['./multiple-choice-question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleChoiceQuestionEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() question: MultipleChoiceQuestion;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<MultipleChoiceQuestion> = new EventEmitter();

  multipleChoicesFormGroup: MultipleChoiceFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  constructor() {
    super();
  }

  get title(): AbstractControl {
    return this.multipleChoicesFormGroup.formGroup.get('title');
  }
  get options(): FormArray {
    return this.multipleChoicesFormGroup.formGroup.get('options') as FormArray;
  }
  get correctAnswersIndices(): AbstractControl {
    return this.multipleChoicesFormGroup.formGroup.get('correctAnswersIndices');
  }
  get score(): AbstractControl {
    return this.multipleChoicesFormGroup.formGroup.get('score');
  }
  get penalty(): AbstractControl {
    return this.multipleChoicesFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.multipleChoicesFormGroup = new MultipleChoiceFormGroup(this.question);
      this.checkState();
      this.multipleChoicesFormGroup.formGroup.valueChanges
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => this.questionChanged());
    }
    if ('isTest' in changes && !changes.isTest.isFirstChange()) {
      this.checkState();
      if (!this.isTest) {
        this.penalty.setValue(0);
        this.clearAnswers();
      }
    }
    if ('required' in changes && !changes.required.isFirstChange()) {
      this.checkState();
      this.onRequiredChanged();
    }
  }

  /**
   * Helper method to improve *ngFor performance
   * @param index
   */
  trackByFn(index: any): any {
    return index;
  }

  /**
   * Changes internal state of the component and emits change event
   */
  questionChanged(): void {
    this.multipleChoicesFormGroup.formGroup.markAsDirty();
    this.multipleChoicesFormGroup.setToMCQ(this.question, this.isTest);
    this.questionChange.emit(this.question);
  }

  /**
   * Deletes all answers
   */
  clearAnswers(): void {
    this.correctAnswersIndices.setValue([]);
    this.questionChanged();
  }

  /**
   * Adds or removes answer from correct answers
   * @param event event of checkbox change
   * @param index index of an answer which has been changed
   */
  onAnswerChanged(event: MatCheckboxChange, index: number): void {
    if (event.checked) {
      this.addCorrectAnswer(index);
    } else {
      this.removeCorrectAnswer(index);
    }
  }

  /**
   * Deletes an option (one of the answers)
   * @param index index of the option which should be deleted
   */
  deleteOption(index: number): void {
    this.options.removeAt(index);
    this.removeCorrectAnswer(index);
    this.questionChanged();
  }

  /**
   * Adds new option
   */
  addOption(): void {
    (this.options as FormArray).push(new FormControl('', Validators.required));
    this.questionChanged();
  }

  /**
   * Changes internal state of component if required attribute of answer was changed
   */
  onRequiredChanged(): void {
    if (!this.required) {
      this.score.setValue(0);
    }
  }

  /**
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.correctAnswersIndices.value.push(index);
    this.questionChanged();
    this.correctAnswersIndices.updateValueAndValidity();
  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.correctAnswersIndices.value.indexOf(index);
    if (indexToRemove !== -1) {
      this.correctAnswersIndices.value.splice(indexToRemove, 1);
      this.questionChanged();
      this.correctAnswersIndices.updateValueAndValidity();
    }
  }

  /**
   * Enables/disables score and penalty form field based on required and isTest inputs
   */
  checkState(): void {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.multipleChoicesFormGroup.addAnswersValidator();
    } else {
      this.multipleChoicesFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.multipleChoicesFormGroup.formGroup.updateValueAndValidity();
  }
}
