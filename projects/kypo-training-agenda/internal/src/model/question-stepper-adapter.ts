import { Question } from '@muni-kypo-crp/training-model';
import { StepperItemState } from '@sentinel/components/stepper';

export class QuestionStepperAdapter {
  private _question: Question;
  id: number;
  title: string;
  isActive: boolean;
  required: boolean;
  valid: boolean;
  primaryIcon: string;
  state: StepperItemState;

  constructor(question: Question) {
    this._question = question;
    this.id = question.id;
    this.title = question.title;
    this.valid = question.valid;
    this.state = new StepperItemState();
    this.required = question.required;
    this.state.icon = 'help_outline';
    this.state.hasState = false;
    this.primaryIcon = 'help_outline';
  }

  get question(): Question {
    return this._question;
  }

  set question(value: Question) {
    this._question = value;
    this.id = value.id;
    this.title = value.title;
  }
}
