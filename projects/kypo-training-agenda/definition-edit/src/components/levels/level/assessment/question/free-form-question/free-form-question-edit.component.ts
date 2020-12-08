import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { SentinelBaseDirective } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { FreeFormQuestion } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { FreeFormQuestionFormGroup } from './free-form-question-form-group';

@Component({
  selector: 'kypo-free-form-question-edit',
  templateUrl: './free-form-question-edit.component.html',
  styleUrls: ['./free-form-question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component for editing a question of type Free Form
 */
export class FreeFormQuestionEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() question: FreeFormQuestion;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<FreeFormQuestion> = new EventEmitter();

  freeFormValid: boolean;
  freeFormQuestionFormGroup: FreeFormQuestionFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  get title(): AbstractControl {
    return this.freeFormQuestionFormGroup.formGroup.get('title');
  }
  get answers(): FormArray {
    return this.freeFormQuestionFormGroup.formGroup.get('answers') as FormArray;
  }
  get score(): AbstractControl {
    return this.freeFormQuestionFormGroup.formGroup.get('score');
  }
  get penalty(): AbstractControl {
    return this.freeFormQuestionFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      if (!this.freeFormQuestionFormGroup) {
        this.freeFormQuestionFormGroup = new FreeFormQuestionFormGroup(this.question);
        this.checkState();
        this.freeFormQuestionFormGroup.formGroup.valueChanges
          .pipe(takeWhile(() => this.isAlive))
          .subscribe(() => this.questionChanged());
      }
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
   * Changes internal state of the component if question is changed and emits event to parent component
   */
  questionChanged(): void {
    this.freeFormQuestionFormGroup.formGroup.markAsDirty();
    this.freeFormQuestionFormGroup.setToFFQ(this.question, this.freeFormValid, this.isTest);
    this.questionChange.emit(this.question);
  }

  /**
   * Changes internal state of the component if answer is changed
   * @param event change event of answers
   */
  answerChanged(event: FormGroup): void {
    this.freeFormValid = event.valid;
    this.answers.clear();
    event.value['items'].forEach((item) => {
      (this.answers as FormArray).push(new FormControl(item));
    });
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
   * Enables/disables score and penalty form field based on required and isTest inputs
   */
  private checkState() {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.freeFormQuestionFormGroup.addAnswersValidator();
    } else {
      this.freeFormQuestionFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.freeFormQuestionFormGroup.formGroup.updateValueAndValidity();
  }

  private clearAnswers() {
    this.answers.clear();
    this.questionChanged();
  }
}
