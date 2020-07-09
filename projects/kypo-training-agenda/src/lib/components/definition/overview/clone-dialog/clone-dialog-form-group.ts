import { FormControl, FormGroup } from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';

/**
 * Form group controls for form in clone dialog component
 */
export class CloneDialogFormGroup {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      clonedDefinitionTitle: new FormControl('', [SentinelValidators.noWhitespace]),
    });
  }
}
