import { FormControl } from '@angular/forms';

export class TrainingValidators {
  public static noFlagForbiddenSymbols(control: FormControl) {
    const valueStr = control.value.toString();
    if (!valueStr.match(`[{,},\\[,\\],:]+`)) {
      // contains { or }
      return null;
    } else {
      return { flagForbiddenSymbols: true };
    }
  }
}
