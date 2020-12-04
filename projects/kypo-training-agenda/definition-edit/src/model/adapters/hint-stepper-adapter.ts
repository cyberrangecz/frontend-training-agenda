import { Hint } from '@muni-kypo-crp/training-model';
import { StepItem, StepperItemState } from '@sentinel/components/stepper';

export class HintStepperAdapter implements StepItem {
  private _hint: Hint;
  id: number;
  title: string;
  isActive: boolean;
  primaryIcon: string;
  state: StepperItemState;

  constructor(hint: Hint) {
    this._hint = hint;
    this.id = hint.id;
    this.title = hint.title;
    this.state = new StepperItemState();
    this.state.icon = 'help_outline';
    this.state.hasState = false;
    this.primaryIcon = 'help_outline';
  }

  get hint(): Hint {
    return this._hint;
  }

  set hint(value: Hint) {
    this._hint = value;
    this.id = value.id;
    this.title = value.title;
  }
}
