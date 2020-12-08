import { FormControl, FormGroup } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { InfoLevel } from '@muni-kypo-crp/training-model';

/**
 * Form control class for info level edit component
 */
export class InfoLevelEditFormGroup {
  formGroup: FormGroup;

  constructor(level: InfoLevel) {
    this.formGroup = new FormGroup({
      title: new FormControl(level.title, SentinelValidators.noWhitespace),
      content: new FormControl(level.content, SentinelValidators.noWhitespace),
    });
  }

  /**
   * Sets inserted form values from inputs to info level
   * @param level level which values should be filled
   */
  setToLevel(level: InfoLevel): void {
    level.title = this.formGroup.get('title').value;
    level.content = this.formGroup.get('content').value;
    level.valid = this.formGroup.valid;
  }
}
