import { FormControl, FormGroup } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { AccessLevel } from '@muni-kypo-crp/training-model';

/**
 * Form control class for access level edit component
 */
export class AccessLevelEditFormGroup {
  formGroup: FormGroup;

  constructor(level: AccessLevel) {
    this.formGroup = new FormGroup({
      title: new FormControl(level.title, SentinelValidators.noWhitespace),
      passkey: new FormControl(level.passkey, SentinelValidators.noWhitespace),
      cloudContent: new FormControl(level.cloudContent, SentinelValidators.noWhitespace),
      localContent: new FormControl(level.localContent, SentinelValidators.noWhitespace),
    });
  }

  /**
   * Sets inserted form values from inputs to access level
   * @param level level which values should be filled
   */
  setToLevel(level: AccessLevel): void {
    level.title = this.formGroup.get('title').value;
    level.passkey = this.formGroup.get('passkey').value;
    level.cloudContent = this.formGroup.get('cloudContent').value;
    level.localContent = this.formGroup.get('localContent').value;
    level.valid = this.formGroup.valid;
  }
}
