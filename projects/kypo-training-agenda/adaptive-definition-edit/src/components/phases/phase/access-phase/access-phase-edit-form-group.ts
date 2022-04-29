import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccessPhase } from '@muni-kypo-crp/training-model';
import { SentinelValidators } from '@sentinel/common';

/**
 * Form control class for access-phase phases edit component
 */
export class AccessPhaseEditFormGroup {
  formGroup: FormGroup;

  constructor(phase: AccessPhase) {
    this.formGroup = new FormGroup({
      title: new FormControl(phase.title, Validators.required),
      passkey: new FormControl(phase.passkey, SentinelValidators.noWhitespace),
      cloudContent: new FormControl(phase.cloudContent, SentinelValidators.noWhitespace),
      localContent: new FormControl(phase.localContent, SentinelValidators.noWhitespace),
    });
  }

  /**
   * Sets inserted form values from inputs to access-phase phases
   * @param phase phases which values should be filled
   */
  setToPhase(phase: AccessPhase): void {
    phase.title = this.formGroup.get('title').value;
    phase.passkey = this.formGroup.get('passkey').value;
    phase.passkey = phase.passkey ? phase.passkey.trim() : phase.passkey;
    phase.cloudContent = this.formGroup.get('cloudContent').value;
    phase.localContent = this.formGroup.get('localContent').value;
    phase.valid = this.formGroup.valid;
  }
}
