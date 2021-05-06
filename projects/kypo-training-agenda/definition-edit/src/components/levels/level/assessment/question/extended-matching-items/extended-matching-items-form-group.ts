import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { ExtendedMatchingItems } from '@muni-kypo-crp/training-model';

/**
 * Form control group for form in EMI edit component
 */
export class ExtendedMatchingItemsFormGroup {
  formGroup: FormGroup;

  constructor(emi: ExtendedMatchingItems) {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(emi.title, SentinelValidators.noWhitespace),
        statements: new FormArray(
          emi.extendedMatchingStatements.map(
            (statement) =>
              new FormGroup({
                id: new FormControl(statement.id),
                order: new FormControl(statement.order),
                text: new FormControl(statement.text, SentinelValidators.noWhitespace),
                correctOptionOrder: new FormControl(statement.correctOptionOrder),
              })
          )
        ),
        options: new FormArray(
          emi.extendedMatchingOptions.map(
            (option) =>
              new FormGroup({
                id: new FormControl(option.id),
                order: new FormControl(option.order),
                text: new FormControl(option.text, SentinelValidators.noWhitespace),
              })
          )
        ),
        score: new FormControl(emi.score, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(Question.MAX_QUESTION_SCORE),
        ]),
        penalty: new FormControl(emi.penalty, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(Question.MAX_QUESTION_PENALTY),
        ]),
      },
      this.noSelectedAnswers
    );
  }

  /**
   * Sets inserted input values to emi object
   * @param emi emi object to be filled with inserted inputs
   * @param isTest true if level is test, false if questionnaire
   */
  setToEMI(emi: ExtendedMatchingItems, isTest: boolean): void {
    emi.title = this.formGroup.get('title').value;
    emi.extendedMatchingStatements = this.formGroup.get('statements').value;
    emi.extendedMatchingOptions = this.formGroup.get('options').value;
    emi.score = emi.required ? this.formGroup.get('score').value : 0;
    emi.penalty = isTest ? this.formGroup.get('penalty').value : 0;
    emi.valid = this.formGroup.valid;
  }

  private noSelectedAnswers: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let error = null;
    (control.get('statements') as FormArray).controls.forEach((statement) => {
      if (statement.get('correctOptionOrder').value === null) {
        error = { noSelectedAnswers: true };
      }
    });
    return error ? error : null;
  };

  /**
   * Adds correct answers validators (if level is test)
   */
  addAnswersValidator(): void {
    this.formGroup.setValidators(this.noSelectedAnswers);
  }

  /**
   * Removes correct answers validators (if level is questionnaire)
   */
  removeAnswersValidator(): void {
    this.formGroup.clearValidators();
    this.formGroup.updateValueAndValidity();
  }
}
