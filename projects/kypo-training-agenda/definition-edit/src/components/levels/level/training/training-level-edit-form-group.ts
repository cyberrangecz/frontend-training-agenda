import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { ReferenceSolutionNode, TrainingLevel } from '@muni-kypo-crp/training-model';

export const MAX_SCORE = 100;
export const INCORRECT_ANSWER_LIMIT = 100;
export const MAX_ANSWER = 50;

/**
 * Form control class for training level edit component
 */
export class TrainingLevelEditFormGroup {
  formGroup: FormGroup;

  constructor(level: TrainingLevel) {
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
      variantAnswers: new FormControl(level.variantAnswers),
      answer: new FormControl({ value: level.answer, disabled: level.variantAnswers }, [
        SentinelValidators.noWhitespace,
        Validators.maxLength(MAX_ANSWER),
      ]),
      answerVariableName: new FormControl({ value: level.answerVariableName, disabled: !level.variantAnswers }, [
        SentinelValidators.noWhitespace,
        Validators.maxLength(MAX_ANSWER),
      ]),
      estimatedDuration: new FormControl(level.estimatedDuration, [Validators.pattern('^[0-9]*$'), Validators.min(1)]),
      minimalPossibleSolveTime: new FormControl(level.minimalPossibleSolveTime, [
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
      ]),
      referenceSolution: new FormControl(JSON.stringify(level.referenceSolution, null, 2), [
        this.referenceSolutionValidator,
      ]),
      commandsRequired: new FormControl(level.commandsRequired),
    });
  }

  setReferenceSolution(referenceSolution: string): ReferenceSolutionNode[] {
    try {
      const data = JSON.parse(referenceSolution);
      return data.map((solution) => {
        const refSolution: ReferenceSolutionNode = new ReferenceSolutionNode();
        refSolution.cmd = solution.cmd;
        refSolution.cmd_type = solution.cmd_type;
        refSolution.cmd_regex = solution.cmd_regex;
        refSolution.optional = solution.optional;
        refSolution.state_name = solution.state_name;
        refSolution.prereq_state = solution.prereq_state;
        return refSolution;
      });
    } catch (e) {
      return null;
    }
  }

  /**
   * Sets inserted form values from inputs to training level
   * @param level level which values should be filled
   */
  setToLevel(level: TrainingLevel): void {
    level.title = this.formGroup.get('title').value;
    level.content = this.formGroup.get('content').value;
    level.solution = this.formGroup.get('solution').value;
    level.maxScore = this.formGroup.get('maxScore').value;
    level.solutionPenalized = this.formGroup.get('solutionPenalized').value;
    level.incorrectAnswerLimit = this.formGroup.get('incorrectAnswerLimit').value;
    level.variantAnswers = this.formGroup.get('variantAnswers').value;
    level.answer = this.formGroup.get('answer').value;
    level.answer = level.answer ? level.answer.trim() : level.answer;
    level.answerVariableName = this.formGroup.get('answerVariableName').value;
    level.answerVariableName = level.answerVariableName ? level.answerVariableName.trim() : level.answerVariableName;
    level.estimatedDuration = this.formGroup.get('estimatedDuration').value;
    level.minimalPossibleSolveTime = this.formGroup.get('minimalPossibleSolveTime').value;
    level.referenceSolution = this.setReferenceSolution(this.formGroup.get('referenceSolution').value);
    level.commandsRequired = this.formGroup.get('commandsRequired').value;
    level.valid = this.formGroup.valid && level.hints.every((hint) => hint.valid);
  }

  private referenceSolutionValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    let error = null;
    if (!this.setReferenceSolution(control.value) && control.value) {
      error = { referenceSolution: true };
    }
    return error ? error : null;
  };
}
