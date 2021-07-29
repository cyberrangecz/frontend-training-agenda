import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { GameLevel } from '@muni-kypo-crp/training-model';

export const MAX_SCORE = 100;
export const INCORRECT_ANSWER_LIMIT = 100;
export const MAX_ANSWER = 50;
export const MAX_ESTIMATED_DURATION = 60;

/**
 * Form control class for game level edit component
 */
export class GameLevelEditFormGroup {
  formGroup: FormGroup;

  constructor(level: GameLevel) {
    this.formGroup = new FormGroup({
      title: new FormControl(level.title, SentinelValidators.noWhitespace),
      content: new FormControl(level.content, SentinelValidators.noWhitespace),
      solution: new FormControl(level.solution, SentinelValidators.noWhitespace),
      maxScore: new FormControl(level.maxScore, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(MAX_SCORE),
      ]),
      solutionPenalized: new FormControl(level.solutionPenalized),
      incorrectAnswerLimit: new FormControl(level.incorrectAnswerLimit, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(INCORRECT_ANSWER_LIMIT),
      ]),
      answer: new FormControl(level.answer, [SentinelValidators.noWhitespace, Validators.maxLength(MAX_ANSWER)]),
      estimatedDuration: new FormControl(level.estimatedDuration, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(MAX_ESTIMATED_DURATION),
      ]),
    });
  }

  /**
   * Sets inserted form values from inputs to game level
   * @param level level which values should be filled
   */
  setToLevel(level: GameLevel): void {
    level.title = this.formGroup.get('title').value;
    level.content = this.formGroup.get('content').value;
    level.solution = this.formGroup.get('solution').value;
    level.maxScore = this.formGroup.get('maxScore').value;
    level.solutionPenalized = this.formGroup.get('solutionPenalized').value;
    level.incorrectAnswerLimit = this.formGroup.get('incorrectAnswerLimit').value;
    level.answer = this.formGroup.get('answer').value;
    level.estimatedDuration = this.formGroup.get('estimatedDuration').value;
    level.valid = this.formGroup.valid && level.hints.every((hint) => hint.valid);
  }
}
