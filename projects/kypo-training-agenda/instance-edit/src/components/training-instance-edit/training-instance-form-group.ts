import { UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';

/**
 * Training instance edit form group control
 */
export class TrainingInstanceFormGroup {
  formGroup: UntypedFormGroup;

  constructor(trainingInstance: TrainingInstance) {
    this.formGroup = new UntypedFormGroup(
      {
        startTime: new UntypedFormControl(trainingInstance.startTime),
        endTime: new UntypedFormControl(trainingInstance.endTime, [Validators.required, this.dateValidator]),
        title: new UntypedFormControl(trainingInstance.title, [SentinelValidators.noWhitespace]),
        trainingDefinition: new UntypedFormControl(trainingInstance.trainingDefinition, [Validators.required]),
        accessTokenPrefix: new UntypedFormControl(this.getTokenPrefix(trainingInstance.accessToken), [
          SentinelValidators.noWhitespace,
        ]),
        localEnvironment: new UntypedFormControl(trainingInstance.localEnvironment),
        backwardMode: new UntypedFormControl(trainingInstance.backwardMode),
        showStepperBar: new UntypedFormControl(trainingInstance.showStepperBar),
      },
      { validators: this.dateSequenceValidator },
    );
  }

  disable(): void {
    this.formGroup.disable({ emitEvent: false });
    this.formGroup.get('title').enable({ emitEvent: false });
    const isExpired = this.formGroup.get('endTime').value
      ? this.formGroup.get('endTime').value.valueOf() < Date.now()
      : false;
    if (!isExpired) {
      this.formGroup.get('endTime').enable({ emitEvent: false });
    }
  }

  private dateSequenceValidator: ValidatorFn = (control: UntypedFormGroup): ValidationErrors | null => {
    let error = null;
    const startTime = control.get('startTime').value ? control.get('startTime').value : Date.now();
    const endTime = control.get('endTime').value;
    if (startTime && endTime && startTime.valueOf() > endTime.valueOf()) {
      error = { c: true };
    }
    return error ? error : null;
  };

  private dateValidator: ValidatorFn = (control: UntypedFormControl): ValidationErrors | null => {
    let error = null;
    if (control.value && control.value.valueOf() < Date.now()) {
      error = { dateInPast: true };
    }
    return error ? error : null;
  };

  /**
   * Sets values from training instance to individual inputs
   * @param trainingInstance training instance which values should be set to inputs
   */
  setValuesToTrainingInstance(trainingInstance: TrainingInstance): void {
    trainingInstance.startTime = this.formGroup.get('startTime').value;
    trainingInstance.endTime = this.formGroup.get('endTime').value;
    trainingInstance.title = this.formGroup.get('title').value;
    trainingInstance.trainingDefinition = this.formGroup.get('trainingDefinition').value;
    trainingInstance.accessToken = this.formGroup.get('accessTokenPrefix').value?.trim();
    trainingInstance.localEnvironment = this.formGroup.get('localEnvironment').value;
    trainingInstance.backwardMode = this.formGroup.get('backwardMode').value;
    trainingInstance.showStepperBar = this.formGroup.get('showStepperBar').value;
  }

  private getTokenPrefix(accessToken: string): string {
    return accessToken?.substring(0, accessToken.lastIndexOf('-'));
  }
}
