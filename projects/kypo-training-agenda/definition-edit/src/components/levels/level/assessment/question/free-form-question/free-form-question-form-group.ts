import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { FreeFormQuestion } from '@muni-kypo-crp/training-model';

/**
 * Form control for free form question component
 */
export class FreeFormQuestionFormGroup {
  freeFormQuestionFormGroup: FormGroup;

  constructor(ffq: FreeFormQuestion) {
    this.freeFormQuestionFormGroup = new FormGroup(
      {
        title: new FormControl(ffq.title, SentinelValidators.noWhitespace),
        score: new FormControl(ffq.score, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(Question.MAX_QUESTION_SCORE),
        ]),
        penalty: new FormControl(ffq.penalty, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(Question.MAX_QUESTION_PENALTY),
        ]),
        choices: new FormArray(
          ffq.choices.map(
            (choice) =>
              new FormGroup({
                id: new FormControl(choice.id),
                text: new FormControl(choice.text, [SentinelValidators.noWhitespace, Validators.required]),
                correct: new FormControl(choice.correct),
                order: new FormControl(choice.order),
              })
          )
        ),
      },
      this.noSelectedChoices
    );
  }

  /**
   * Sets form input values to free form question object
   * @param ffq free form question to be filled with values
   * @param isTest true if level is test, false if questionnaire
   */
  setToFFQ(ffq: FreeFormQuestion, isTest: boolean): void {
    ffq.title = this.freeFormQuestionFormGroup.get('title').value;
    ffq.choices = this.freeFormQuestionFormGroup.get('choices').value;
    ffq.score = ffq.required ? this.freeFormQuestionFormGroup.get('score').value : 0;
    ffq.penalty = isTest ? this.freeFormQuestionFormGroup.get('penalty').value : 0;
    ffq.valid = !isTest ? true : this.freeFormQuestionFormGroup.valid;
  }

  private noSelectedChoices: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let error = null;
    const choices = control.get('choices');
    if (choices && choices.value.length === 0) {
      error = { noSelectedChoices: true };
    }
    return error ? error : null;
  };

  /**
   * Adds validator to answers if preselected correct answers are required (if level is test)
   */
  addChoicesValidator(): void {
    this.freeFormQuestionFormGroup.setValidators(this.noSelectedChoices);
  }

  /**
   * Removes validators from answers if preselected correct answers are not required (if level is questionnaire)
   */
  removeChoicesValidator(): void {
    this.freeFormQuestionFormGroup.clearValidators();
    this.freeFormQuestionFormGroup.updateValueAndValidity();
  }
}
