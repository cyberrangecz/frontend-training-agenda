import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionFormGroup } from '../question-form-group';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'kypo-adaptive-multiple-choice-question-edit',
  templateUrl: './multiple-choice-question-edit.component.html',
  styleUrls: ['./multiple-choice-question-edit.component.css'],
})
/**
 * Component for editing a question of type Multiple Choice
 */
export class MultipleChoiceQuestionEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() index: number;
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;
  @Output() questionChange: EventEmitter<AdaptiveQuestion> = new EventEmitter();

  questionnaireTypes = QuestionnaireTypeEnum;
  multipleChoicesFormGroup: QuestionFormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.multipleChoicesFormGroup = new QuestionFormGroup(this.question);
      this.choices.markAllAsTouched();
      this.multipleChoicesFormGroup.questionFormGroup.valueChanges
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => this.questionChanged());
    }
  }

  get title(): AbstractControl {
    return this.multipleChoicesFormGroup.questionFormGroup.get('title');
  }
  get choices(): FormArray {
    return this.multipleChoicesFormGroup.questionFormGroup.get('choices') as FormArray;
  }

  addOption(): void {
    this.choices.push(
      new FormGroup({
        id: new FormControl(null),
        text: new FormControl('new Option', [SentinelValidators.noWhitespace, Validators.required]),
        correct: new FormControl(true),
        order: new FormControl(this.choices.length),
      })
    );

    this.questionChanged();
  }

  deleteOption(optionIndex: number): void {
    this.choices.removeAt(optionIndex);
    this.choices.controls
      .slice(optionIndex)
      .forEach((choice) => choice.get('order').setValue(choice.get('order').value - 1));
    this.questionChanged();
  }

  /**
   * Changes internal state of the component if question is changed and emits event to parent component
   */
  questionChanged(): void {
    this.multipleChoicesFormGroup.questionFormGroup.markAsDirty();
    this.multipleChoicesFormGroup.setToQuestion(this.question);
    this.questionChange.emit(this.question);
  }
}
