import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';

/**
 * Form control class for access training run form
 */
export class TraineeAccessTrainingFormGroup {
  formGroup: FormGroup;

  constructor() {
    const accessTokenPinLimitations = 4;
    this.formGroup = new FormGroup({
      accessTokenPrefix: new FormControl('', SentinelValidators.noWhitespace),
      accessTokenPin: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(accessTokenPinLimitations),
        Validators.maxLength(accessTokenPinLimitations),
      ]),
    });
  }
}
