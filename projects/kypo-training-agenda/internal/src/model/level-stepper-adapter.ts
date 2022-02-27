import { Level } from '@muni-kypo-crp/training-model';
import { AbstractLevelTypeEnum } from '@muni-kypo-crp/training-model';
import { StepItem, StepperItemState } from '@sentinel/components/stepper';

export class LevelStepperAdapter implements StepItem {
  id: number;
  title: string;
  level: Level;
  primaryIcon: string;
  isActive: boolean;
  state: StepperItemState;

  constructor(level: Level) {
    this.id = level.id;
    this.title = level.title;
    this.level = level;
    this.isActive = false;
    this.state = new StepperItemState();
    this.state.hasState = false;
    this.primaryIcon = this.getLevelIcon(level);
  }

  private getLevelIcon(level: Level): string {
    switch (level.type) {
      case AbstractLevelTypeEnum.Assessment:
        return 'assignment';
      case AbstractLevelTypeEnum.Training:
        return 'videogame_asset';
      case AbstractLevelTypeEnum.Access:
        return 'settings';
      case AbstractLevelTypeEnum.Info:
        return 'info';
      default: {
        this.primaryIcon = 'help';
      }
    }
  }
}
