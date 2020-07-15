import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';
import { Question } from 'kypo-training-model';
import { FreeFormQuestion } from 'kypo-training-model';
import { takeWhile } from 'rxjs/operators';
import { FreeFormItemsChangeEvent } from 'kypo-training-agenda/internal';
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
export class FreeFormQuestionEditComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() question: FreeFormQuestion;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<FreeFormQuestion> = new EventEmitter();

  freeFormValid: boolean;
  freeFormQuestionFormGroup: FreeFormQuestionFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  ngOnInit() {}

  get title() {
    return this.freeFormQuestionFormGroup.formGroup.get('title');
  }
  get answers() {
    return this.freeFormQuestionFormGroup.formGroup.get('answers') as FormArray;
  }
  get score() {
    return this.freeFormQuestionFormGroup.formGroup.get('score');
  }
  get penalty() {
    return this.freeFormQuestionFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      if (!this.freeFormQuestionFormGroup) {
        this.freeFormQuestionFormGroup = new FreeFormQuestionFormGroup(this.question);
        this.checkState();
        this.freeFormQuestionFormGroup.formGroup.valueChanges
          .pipe(takeWhile((_) => this.isAlive))
          .subscribe((_) => this.questionChanged());
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
  questionChanged() {
    this.freeFormQuestionFormGroup.formGroup.markAsDirty();
    this.freeFormQuestionFormGroup.setToFFQ(this.question, this.freeFormValid, this.isTest);
    this.questionChange.emit(this.question);
  }

  /**
   * Changes internal state of the component if answer is changed
   * @param event change event of answers
   */
  answerChanged(event: FreeFormItemsChangeEvent) {
    this.freeFormValid = event.validity;
    if (event.isAdded) {
      (this.answers as FormArray).push(
        new FormControl('', this.required ? SentinelValidators.noWhitespace : undefined)
      );
    } else if (event.isDeleted) {
      this.answers.removeAt(event.index);
    } else if (event.cleared) {
      this.answers.clear();
      this.answers.setValue(this.answers.value);
    } else {
      this.answers.at(event.index).setValue(event.items[event.index]);
    }
  }

  /**
   * Changes internal state of component if required attribute of answer was changed
   */
  onRequiredChanged() {
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
