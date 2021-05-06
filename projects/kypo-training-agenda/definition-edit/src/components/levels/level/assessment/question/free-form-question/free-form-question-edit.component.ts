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
  freeFormChoices: FormArray;

  get title(): AbstractControl {
    return this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.get('title');
  }
  get score(): AbstractControl {
    return this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.get('score');
  }
  get penalty(): AbstractControl {
    return this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.get('penalty');
  }
  get choices(): FormArray {
    return this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.get('choices') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      if (!this.freeFormQuestionFormGroup) {
        this.freeFormQuestionFormGroup = new FreeFormQuestionFormGroup(this.question);
        this.checkState();
        this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.valueChanges
          .pipe(takeWhile(() => this.isAlive))
          .subscribe(() => this.questionChanged());
      }
    }
    if ('isTest' in changes && !changes.isTest.isFirstChange()) {
      this.checkState();
      if (!this.isTest) {
        this.penalty.setValue(0);
        this.clearChoices();
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
    this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.markAsDirty();
    this.freeFormQuestionFormGroup.setToFFQ(this.question, this.isTest);
    this.questionChange.emit(this.question);
  }

  /**
   * Adds new answer
   */
  addChoice(): void {
    this.choices.push(
      new FormGroup({
        id: new FormControl(null),
        text: new FormControl('', [SentinelValidators.noWhitespace, Validators.required]),
        correct: new FormControl(true),
        order: new FormControl(this.choices.length),
      })
    );
    this.questionChanged();
  }

  /**
   * Deletes a choice
   * @param index index of the answer which should be deleted
   */
  deleteChoice(index: number): void {
    this.choices.removeAt(index);
    this.choices.controls.slice(index).forEach((choice) => choice.get('order').setValue(choice.get('order').value - 1));
    this.questionChanged();
  }

  /**
   * Helper method to improve *ngFor performance
   * @param index
   */
  trackByFn(index: any): any {
    return index;
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
      this.freeFormQuestionFormGroup.addChoicesValidator();
    } else {
      this.freeFormQuestionFormGroup.removeChoicesValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.freeFormQuestionFormGroup.freeFormQuestionFormGroup.updateValueAndValidity();
  }

  clearChoices(): void {
    this.choices.clear();
    this.questionChanged();
  }
}
