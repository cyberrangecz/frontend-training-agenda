import { StepItem, StepperItemState } from '@sentinel/components/stepper';
import { AbstractPhaseTypeEnum, Phase, QuestionnairePhase, QuestionnaireTypeEnum } from '@muni-kypo-crp/training-model';

export class PhaseStepperAdapter implements StepItem {
  id: number;
  title: string;
  phase: Phase;
  primaryIcon: string;
  isActive: boolean;
  state: StepperItemState;
  type: AbstractPhaseTypeEnum;

  constructor(phase: Phase) {
    this.id = phase.id;
    this.title = phase.title;
    this.phase = phase;
    this.isActive = false;
    this.state = new StepperItemState();
    this.state.hasState = false;
    this.type = phase.type;
    this.primaryIcon = this.getPhaseIcon(phase);
  }

  private getPhaseIcon(phase: Phase): string {
    switch (phase.type) {
      case AbstractPhaseTypeEnum.Info:
        return 'info';
      case AbstractPhaseTypeEnum.Training:
        return 'transform';
      case AbstractPhaseTypeEnum.Access:
        return 'settings';
      case AbstractPhaseTypeEnum.Task:
        return 'videogame_asset';
      case AbstractPhaseTypeEnum.Questionnaire: {
        switch ((phase as QuestionnairePhase).questionnaireType) {
          case QuestionnaireTypeEnum.General:
            return 'help';
          case QuestionnaireTypeEnum.Adaptive:
            return 'help_center';
          default:
            return 'help';
        }
      }
    }
  }
}
