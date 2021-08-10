import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { AssessmentTypeEnum } from '@muni-kypo-crp/training-model';
import { AssessmentLevel } from '@muni-kypo-crp/training-model';

/**
 * Form control class for assessment level edit component
 */
export class AssessmentLevelEditFormGroup {
  formGroup: FormGroup;

  constructor(level: AssessmentLevel) {
    const maxLevelDuration = 60;
    this.formGroup = new FormGroup({
      title: new FormControl(level.title, SentinelValidators.noWhitespace),
      instructions: new FormControl(level.instructions),
      isTest: new FormControl(level.assessmentType === AssessmentTypeEnum.Test),
      estimatedDuration: new FormControl(level.estimatedDuration, [
        Validators.max(maxLevelDuration),
        Validators.min(1),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }
  /**
   * Sets inserted form values from inputs to assessment level
   * @param level level which values should be filled
   */
  setToLevel(level: AssessmentLevel): void {
    level.title = this.formGroup.get('title').value;
    level.instructions = this.formGroup.get('instructions').value;
    level.assessmentType = this.formGroup.get('isTest').value
      ? AssessmentTypeEnum.Test
      : AssessmentTypeEnum.Questionnaire;
    level.estimatedDuration = this.formGroup.get('estimatedDuration').value;
    level.valid = this.formGroup.valid && level.questions.every((question) => question.valid);
  }
}
