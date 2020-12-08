import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
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
export class ExtendedMatchingItemsEditComponent extends SentinelBaseDirective implements OnChanges, AfterViewInit {
  @Input() question: ExtendedMatchingItems;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<ExtendedMatchingItems> = new EventEmitter();

  extendedMatchingQuestionFormGroup: ExtendedMatchingItemsFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  @ViewChildren(MatRadioButton) radioButtons: QueryList<MatRadioButton>;

  constructor() {
    super();
  }

  get title(): AbstractControl {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('title');
  }
  get rows(): FormArray {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('rows') as FormArray;
  }
  get cols(): FormArray {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('cols') as FormArray;
  }
  get correctAnswers(): FormArray {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('correctAnswers') as FormArray;
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

  ngAfterViewInit(): void {
    this.setInitialStateOfRadioButtons();
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
    this.correctAnswers.clear();
    if (this.radioButtons) {
      this.radioButtons.forEach((button) => (button.checked = false));
    }
    this.questionChanged();
  }

  /**
   * Adds answer chosen by a user as a correct answer
   * @param i row coordinate in the matrix representing the possible answers (EMI table)
   * @param j col coordinate in the matrix representing the possible answers (EMI table)
   */
  onAnswerChanged(i: number, j: number): void {
    this.deleteAnswerByRow(i);
    this.correctAnswers.push(new FormControl({ x: i, y: j }));
    this.questionChanged();
  }

  /**
   * Deletes row from the EMI table
   * @param index row coordinate in the matrix representing the EMI table
   */
  deleteRow(index: number): void {
    this.rows.removeAt(index);
    this.deleteAnswerByRow(index);
    this.questionChanged();
  }

  /**
   * Adds new row to the EMI table
   */
  addRow(): void {
    this.rows.push(new FormControl('', SentinelValidators.noWhitespace));
    this.questionChanged();
  }

  /**
   * Deletes column from the EMI table
   * @param index column coordinate in the matrix representing the EMI table
   */
  deleteColumn(index: number): void {
    this.cols.removeAt(index);
    this.deleteAnswersByCol(index);
    this.questionChanged();
  }

  /**
   * Adds new column to the EMI table
   */
  addColumn(): void {
    this.cols.push(new FormControl('', SentinelValidators.noWhitespace));
    this.questionChanged();
  }

  /**
   * Deletes all correct (selected) answers in a given column (usually used after the column itself was deleted)
   * @param colIndex index of a column in a matrix representing the EMI table
   */
  private deleteAnswersByCol(colIndex: number) {
    const answersToDelete = this.correctAnswers.controls.filter((answer) => answer.value.y === colIndex);
    if (answersToDelete.length > 0) {
      answersToDelete.forEach((answerToDelete) => {
        const indexOfAnswerToDelete = this.correctAnswers.controls.indexOf(answerToDelete);
        if (indexOfAnswerToDelete > -1) {
          this.correctAnswers.removeAt(indexOfAnswerToDelete);
        }
      });
    }
  }

  /**
   * Deletes correct (selected) answer in a given row (usually used after the column itself was deleted)
   * @param rowIndex index of a row in a matrix representing the EMI table
   */
  private deleteAnswerByRow(rowIndex: number) {
    const answerToDelete = this.correctAnswers.controls.find((answer) => answer.value.x === rowIndex);
    if (answerToDelete) {
      const indexOfAnswerToDelete = this.correctAnswers.controls.indexOf(answerToDelete);
      if (indexOfAnswerToDelete > -1) {
        this.correctAnswers.removeAt(indexOfAnswerToDelete);
      }
    }
  }

  /**
   * Sets initial state of every radio button (checked / not checked) based on the correct answers coordinates
   */
  private setInitialStateOfRadioButtons() {
    this.radioButtons.forEach((button) => {
      const buttonValue = {
        x: button.value.x,
        y: button.value.y,
      };

      if (this.correctAnswers.value.find((answer) => answer.x === buttonValue.x && answer.y === buttonValue.y)) {
        button.checked = true;
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
      this.penalty.disable();
    }
    this.extendedMatchingQuestionFormGroup.formGroup.updateValueAndValidity();
  }
}
