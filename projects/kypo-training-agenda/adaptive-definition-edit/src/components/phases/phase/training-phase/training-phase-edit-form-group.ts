import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecisionMatrixRow, TrainingPhase } from '@muni-kypo-crp/training-model';

export class TrainingPhaseEditFormGroup {
  formGroup: FormGroup;

  constructor(phase: TrainingPhase) {
    this.formGroup = new FormGroup({
      title: new FormControl(phase.title, Validators.required),
      allowedWrongAnswers: new FormControl(phase.allowedWrongAnswers, [Validators.required, Validators.min(0)]),
      allowedCommands: new FormControl(phase.allowedCommands, [Validators.required, Validators.min(0)]),
      estimatedDuration: new FormControl(phase.estimatedDuration, [Validators.required, Validators.min(0)]),
      decisionMatrix: new FormArray(
        phase.decisionMatrix.map((row, index) =>
          TrainingPhaseEditFormGroup.createRows(row, index === phase.decisionMatrix.length - 1)
        )
      ),
    });
  }

  private static createRows(row: DecisionMatrixRow, isDisabled: boolean): FormGroup {
    return new FormGroup({
      questionnaireAnswered: new FormControl(row.questionnaireAnswered, [Validators.required, Validators.min(0)]),
      completedInTime: new FormControl({ value: row.completedInTime, disabled: isDisabled }, [
        Validators.required,
        Validators.min(0),
      ]),
      keywordUsed: new FormControl({ value: row.keywordUsed, disabled: isDisabled }, [
        Validators.required,
        Validators.min(0),
      ]),
      solutionDisplayed: new FormControl({ value: row.solutionDisplayed, disabled: isDisabled }, [
        Validators.required,
        Validators.min(0),
      ]),
      wrongAnswers: new FormControl({ value: row.wrongAnswers, disabled: isDisabled }, [
        Validators.required,
        Validators.min(0),
      ]),
      order: new FormControl(row.order, [Validators.required, Validators.min(0)]),
      id: new FormControl(row.id, [Validators.required, Validators.min(0)]),
    });
  }

  setToPhase(phase: TrainingPhase): void {
    phase.title = this.formGroup.get('title').value;
    phase.allowedWrongAnswers = this.formGroup.get('allowedWrongAnswers').value;
    phase.allowedCommands = this.formGroup.get('allowedCommands').value;
    phase.estimatedDuration = this.formGroup.get('estimatedDuration').value;
    phase.decisionMatrix = this.formGroup.get('decisionMatrix').value;
    phase.valid = this.formGroup.valid;
  }
}
