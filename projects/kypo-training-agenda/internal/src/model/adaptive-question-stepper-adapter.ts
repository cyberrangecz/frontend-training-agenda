import { StepperItemState } from '@sentinel/components/stepper';
import { AdaptiveQuestion, QuestionTypeEnum } from '@muni-kypo-crp/training-model';

export class AdaptiveQuestionStepperAdapter {
  private _question: AdaptiveQuestion;
  id: number;
  title: string;
  order: number;
  valid: boolean;
  isActive: boolean;
  primaryIcon: string;
  hasRelation: boolean;
  state: StepperItemState;

  constructor(question: AdaptiveQuestion) {
    this._question = question;
    this.id = question.id;
    this.order = question.order;
    this.title = question.text;
    this.valid = question.valid;
    this.state = new StepperItemState();
    this.state.icon = AdaptiveQuestionStepperAdapter.iconType(question.questionType);
    this.state.hasState = false;
    this.hasRelation = question.hasRelation;
    this.primaryIcon = AdaptiveQuestionStepperAdapter.iconType(question.questionType);
  }

  get question(): AdaptiveQuestion {
    return this._question;
  }

  set question(value: AdaptiveQuestion) {
    this._question = value;
    this.title = value.text;
    this.order = value.order;
    this.hasRelation = value.hasRelation;
    this.id = value.id;
  }

  private static iconType(questionType: QuestionTypeEnum): string {
    if (questionType === QuestionTypeEnum.FFQ) {
      return 'edit';
    } else if (questionType === QuestionTypeEnum.MCQ) {
      return 'check_circle_outline';
    } else if (questionType === QuestionTypeEnum.RFQ) {
      return 'star_half';
    }
    return 'help_outline';
  }
}
