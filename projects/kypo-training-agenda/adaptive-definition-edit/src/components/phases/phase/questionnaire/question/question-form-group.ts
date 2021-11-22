import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AdaptiveQuestion, QuestionnaireTypeEnum } from '@muni-kypo-crp/training-model';
import { SentinelValidators } from '@sentinel/common';

export class QuestionFormGroup {
  questionFormGroup: FormGroup;
  questionnaireType: QuestionnaireTypeEnum;

  constructor(ffq: AdaptiveQuestion, questionnaireType: QuestionnaireTypeEnum) {
    this.questionnaireType = questionnaireType;
    this.questionFormGroup = new FormGroup(
      {
        title: new FormControl(ffq.text, SentinelValidators.noWhitespace),
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
   */
  setToQuestion(ffq: AdaptiveQuestion): void {
    ffq.text = this.questionFormGroup.get('title').value;
    ffq.choices = this.questionFormGroup.get('choices').value;
    ffq.valid = this.questionFormGroup.valid;
  }

  private noSelectedChoices: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let error = null;
    const choices = control.get('choices');
    if (choices && choices.value.length === 0 && this.questionnaireType === QuestionnaireTypeEnum.Adaptive) {
      error = { noSelectedChoices: true };
    }
    return error ? error : null;
  };
}
