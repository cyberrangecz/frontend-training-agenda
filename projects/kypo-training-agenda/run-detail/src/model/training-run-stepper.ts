import { SentinelStepper } from '@sentinel/components/stepper';
import { LevelStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Training run levels adapter to kypo stepper component
 */
export class TrainingRunStepper implements SentinelStepper<LevelStepperAdapter> {
  activeLevelIndex: number;
  items: LevelStepperAdapter[];

  constructor(levels: LevelStepperAdapter[], activeLevelIndex: number) {
    this.items = levels;
    this.activeLevelIndex = activeLevelIndex;
    this.markCompletedLevels();
  }

  onActiveLevelUpdated(activeLevelIndex: number): void {
    this.activeLevelIndex = activeLevelIndex;
    this.markCompletedLevels();
    const current = this.items[activeLevelIndex];
    if (current) {
      current.isActive = true;
    }
  }
  /**
   * Marks already completed levels as done
   */
  private markCompletedLevels() {
    for (let i = 0; i < this.activeLevelIndex; i++) {
      this.items[i].primaryIcon = 'done';
      this.items[i].isActive = true;
    }
  }
}
