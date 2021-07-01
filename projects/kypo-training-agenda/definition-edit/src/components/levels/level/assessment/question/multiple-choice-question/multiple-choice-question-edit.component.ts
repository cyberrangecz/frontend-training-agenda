import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';
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
  get choices(): FormArray {
    return this.multipleChoicesFormGroup.formGroup.get('choices') as FormArray;
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
        this.clearCorrectChoices();
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
  clearCorrectChoices(): void {
    this.choices.controls.forEach((choice) => choice.get('correct').setValue(false));
    this.questionChanged();
  }

  /**
   * Deletes an choice (one of the answers)
   * @param index index of the choice which should be deleted
   */
  deleteChoice(index: number): void {
    this.choices.removeAt(index);
    this.choices.controls.slice(index).forEach((choice) => choice.get('order').setValue(choice.get('order').value - 1));
    this.questionChanged();
  }

  /**
   * Adds new choice
   */
  addChoice(): void {
    this.choices.push(
      new FormGroup({
        id: new FormControl(null),
        text: new FormControl('', [SentinelValidators.noWhitespace, Validators.required]),
        correct: new FormControl(false),
        order: new FormControl(this.choices.length),
      })
    );
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
   * Check if at least one choice is selected as correct.
   * @return true if at least one choice is selected as correct, false otherwise
   */
  isCorrectChoiceSelected(): boolean {
    return this.choices.value.filter((choice) => choice.correct).length > 0;
  }

  /**
   * Enables/disables score and penalty form field based on required and isTest inputs
   */
  checkState(): void {
    if (this.required) {
      this.score.enable();
      this.choices.controls.forEach((choice) => choice.get('correct').enable());
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.multipleChoicesFormGroup.addAnswersValidator();
      this.choices.controls.forEach((choice) => choice.get('correct').enable());
    } else {
      this.multipleChoicesFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
      this.score.disable();
      this.choices.controls.forEach((choice) => choice.get('correct').disable());
    }
    this.multipleChoicesFormGroup.formGroup.updateValueAndValidity();
  }
}
