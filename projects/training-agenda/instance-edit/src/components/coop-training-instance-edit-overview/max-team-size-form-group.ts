import {
    FormControl,
    FormGroup,
    UntypedFormControl,
    UntypedFormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { SentinelValidators } from '@sentinel/common';
import { TrainingInstance } from '@crczp/training-model';

/**
 * Training instance edit form group control
 */
export class MaxTeamSizeFormGroup {
    formGroup: UntypedFormGroup;

    constructor(maxTeamSize: number) {
        this.formGroup = new FormGroup({
            maxTeamSize: new FormControl<number>(maxTeamSize, [
                Validators.min(1),
                Validators.max(12),
                Validators.required,
            ]),
        });
    }

    disable(): void {
        this.formGroup.get('maxTeamSize').disable({ emitEvent: false });
    }
}
