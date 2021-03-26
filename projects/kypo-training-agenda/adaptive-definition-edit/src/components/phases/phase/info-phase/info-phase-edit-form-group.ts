import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoPhase } from '@muni-kypo-crp/training-model';

/**
 * Form control class for info-phase-training-phase phases edit component
 */
export class InfoPhaseEditFormGroup {
  formGroup: FormGroup;

  constructor(phase: InfoPhase) {
    this.formGroup = new FormGroup({
      title: new FormControl(phase.title, Validators.required),
      content: new FormControl(phase.content, Validators.required),
    });
  }

  /**
   * Sets inserted form values from inputs to info-phase-training-phase phases
   * @param phase phases which values should be filled
   */
  setToPhase(phase: InfoPhase): void {
    phase.title = this.formGroup.get('title').value;
    phase.content = this.formGroup.get('content').value;
    phase.valid = this.formGroup.valid;
  }
}
