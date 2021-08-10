import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AdaptiveQuestion, QuestionnaireTypeEnum } from '@muni-kypo-crp/training-model';
import { QuestionFormGroup } from '../question-form-group';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';

@Component({
  selector: 'kypo-adaptive-free-form-question-edit',
  templateUrl: './free-form-question-edit.component.html',
  styleUrls: ['./free-form-question-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component for editing a question of type Free Form
 */
export class FreeFormQuestionEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() index: number;
  @Input() question: AdaptiveQuestion;
  @Input() questionnaireType: QuestionnaireTypeEnum;
  @Output() questionChange: EventEmitter<AdaptiveQuestion> = new EventEmitter();

  questionnaireTypes = QuestionnaireTypeEnum;
  freeFormQuestionFormGroup: QuestionFormGroup;

  get title(): AbstractControl {
    return this.freeFormQuestionFormGroup.questionFormGroup.get('title');
  }

  get choices(): FormArray {
    return this.freeFormQuestionFormGroup.questionFormGroup.get('choices') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.freeFormQuestionFormGroup = new QuestionFormGroup(this.question);
      this.choices.markAllAsTouched();
      this.freeFormQuestionFormGroup.questionFormGroup.valueChanges
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => this.questionChanged());
    }
  }

  addOption(): void {
    this.choices.push(
      new FormGroup({
        id: new FormControl(null),
        text: new FormControl('new Answer', [SentinelValidators.noWhitespace, Validators.required]),
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
    this.freeFormQuestionFormGroup.questionFormGroup.markAsDirty();
    this.freeFormQuestionFormGroup.setToQuestion(this.question);
    this.questionChange.emit(this.question);
  }

  /**
   * Helper method to improve *ngFor performance
   * @param index
   */
  trackByFn(index: any): any {
    return index;
  }
}
