import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum } from '@muni-kypo-crp/training-model';
import { QuestionFormGroup } from '../question-form-group';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'kypo-rating-form-question-edit',
  templateUrl: './rating-form-question-edit.component.html',
  styleUrls: ['./rating-form-question-edit.component.css'],
})
/**
 * Component for editing a question of type Rating Form
 */
export class RatingFormQuestionEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() index: number;
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;
  @Output() questionChange: EventEmitter<AdaptiveQuestion> = new EventEmitter();

  questionnaireTypes = QuestionnaireTypeEnum;
  ratingFormFormGroup: QuestionFormGroup;

  get title(): AbstractControl {
    return this.ratingFormFormGroup.questionFormGroup.get('title');
  }
  get choices(): FormArray {
    return this.ratingFormFormGroup.questionFormGroup.get('choices') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.ratingFormFormGroup = new QuestionFormGroup(this.question);
      this.ratingFormFormGroup.questionFormGroup.valueChanges
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => this.questionChanged());
    }
  }
  ratingLevelChanged(ratingLevel: number): void {
    const currentChoiceNum = this.choices.length;
    if (currentChoiceNum < ratingLevel) {
      for (let i = 0; i < ratingLevel - currentChoiceNum; i++) {
        this.createNewChoice((i + 1).toString());
      }
    } else if (currentChoiceNum > ratingLevel) {
      this.choices.patchValue(this.choices.controls.splice(ratingLevel, currentChoiceNum - ratingLevel));
    }
    this.questionChanged();
  }

  /**
   * Changes internal state of the component if question is changed and emits event to parent component
   */
  questionChanged(): void {
    this.ratingFormFormGroup.questionFormGroup.markAsDirty();
    this.ratingFormFormGroup.setToQuestion(this.question);
    this.questionChange.emit(this.question);
  }

  private createNewChoice(text: string): void {
    this.choices.push(
      new FormGroup({
        id: new FormControl(null),
        text: new FormControl(text, [SentinelValidators.noWhitespace, Validators.required]),
        correct: new FormControl(true),
        order: new FormControl(this.choices.length),
      })
    );
  }
}
