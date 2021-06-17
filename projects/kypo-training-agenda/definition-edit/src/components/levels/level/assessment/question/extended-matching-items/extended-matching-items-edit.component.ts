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
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { ExtendedMatchingItems } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { ExtendedMatchingItemsFormGroup } from './extended-matching-items-form-group';

/**
 * Component for editing a question of type Extended Matching Items
 */
@Component({
  selector: 'kypo-extended-matching-items',
  templateUrl: './extended-matching-items-edit.component.html',
  styleUrls: ['./extended-matching-items-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendedMatchingItemsEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() question: ExtendedMatchingItems;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<ExtendedMatchingItems> = new EventEmitter();

  extendedMatchingQuestionFormGroup: ExtendedMatchingItemsFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  constructor() {
    super();
  }

  get title(): AbstractControl {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('title');
  }
  get options(): FormArray {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('options') as FormArray;
  }
  get statements(): FormArray {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('statements') as FormArray;
  }
  get score(): AbstractControl {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('score');
  }
  get penalty(): AbstractControl {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.extendedMatchingQuestionFormGroup = new ExtendedMatchingItemsFormGroup(this.question);
      this.checkState();
      this.extendedMatchingQuestionFormGroup.formGroup.valueChanges
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
   * Helper method to improve performance of *ngFor directive
   * @param index
   */
  trackByFn(index: any): any {
    return index;
  }

  /**
   * Changes internal state of the component and emits event to parent component
   */
  questionChanged(): void {
    this.extendedMatchingQuestionFormGroup.formGroup.markAsDirty();
    this.extendedMatchingQuestionFormGroup.setToEMI(this.question, this.isTest);
    this.questionChange.emit(this.question);
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
   * Clears all correct answers
   */
  clearAnswers(): void {
    this.statements.controls.forEach((statement) => statement.get('correctOptionOrder').setValue(null));
    this.questionChanged();
  }

  /**
   * Adds answer chosen by a user as a correct answer
   * @param i row coordinate in the matrix representing the possible answers (EMI table - statement)
   * @param j col coordinate in the matrix representing the possible answers (EMI table - option)
   */
  onCorrectOptionChanged(i: number, j: number): void {
    this.statements.controls[i].get('correctOptionOrder').setValue(j);
    this.questionChanged();
  }

  /**
   * Check if any option in the matrix representing the EMI table is selected as correct.
   */
  isCheckedAnyOption(): boolean {
    return this.statements.controls.findIndex((statement) => statement.get('correctOptionOrder').value !== null) !== -1;
  }

  /**
   * Check if the option on the given index is selected as correct for the given statement.
   * @param statement to be checked
   * @param optionIndex option coordinate in the matrix representing the EMI table
   */
  isOptionChecked(statement: AbstractControl, optionIndex: number): boolean {
    return statement.get('correctOptionOrder').value == optionIndex;
  }

  /**
   * Deletes statement from the EMI table
   * @param index statement coordinate in the matrix representing the EMI table
   */
  deleteStatement(index: number): void {
    this.statements.removeAt(index);
    this.statements.controls
      .slice(index)
      .forEach((statement) => statement.get('order').setValue(statement.get('order').value - 1));
    this.questionChanged();
  }

  /**
   * Adds new statement to the EMI table
   */
  addStatement(): void {
    this.statements.push(
      new FormGroup({
        id: new FormControl(null),
        order: new FormControl(this.statements.length),
        text: new FormControl('', SentinelValidators.noWhitespace),
        correctOptionOrder: new FormControl(),
      })
    );
    this.questionChanged();
  }

  /**
   * Adds new option to the EMI table
   */
  addOption(): void {
    this.options.push(
      new FormGroup({
        id: new FormControl(null),
        order: new FormControl(this.options.length),
        text: new FormControl('', SentinelValidators.noWhitespace),
      })
    );
    this.questionChanged();
  }

  getOptions(): number[] {
    return this.options.value.map((option) => option.order);
  }

  /**
   * Deletes option from the EMI table
   * @param index option coordinate in the matrix representing the EMI table
   */
  deleteOption(index: number): void {
    this.options.removeAt(index);
    this.updateStatementsAfterDeleteOption(index);
    this.options.controls.slice(index).forEach((option) => option.get('order').setValue(option.get('order').value - 1));
    this.questionChanged();
  }

  /**
   * Update **correctOptionOrder** attribute in statements after the option has been deleted. Attribute corresponding to
   * a parameter **optionIndex** is set to *null* and attributes higher than **optionIndex** are decreased.
   * @param optionIndex index of a option in a matrix representing the EMI table
   */
  private updateStatementsAfterDeleteOption(optionIndex: number) {
    this.statements.controls.forEach((statement) => {
      const correctOptionOrder = statement.get('correctOptionOrder');
      if (correctOptionOrder.value === optionIndex) {
        correctOptionOrder.setValue(null);
      } else if (correctOptionOrder.value && correctOptionOrder.value > optionIndex) {
        correctOptionOrder.setValue(correctOptionOrder.value - 1);
      }
    });
  }

  /**
   * Changes extendedMatchingQuestionFormGroup based on required and isTest inputs
   */
  private checkState() {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.extendedMatchingQuestionFormGroup.addAnswersValidator();
    } else {
      this.extendedMatchingQuestionFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.score.disable();
      this.penalty.disable();
    }
    this.extendedMatchingQuestionFormGroup.formGroup.updateValueAndValidity();
  }
}
