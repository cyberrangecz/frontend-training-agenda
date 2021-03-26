import { SentinelStepper } from '@sentinel/components/stepper';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Adaptive run phases adapter to kypo stepper component
 */
export class AdaptiveRunStepper implements SentinelStepper<PhaseStepperAdapter> {
  activePhaseIndex: number;
  items: PhaseStepperAdapter[];

  constructor(phases: PhaseStepperAdapter[], activePhaseIndex: number) {
    this.items = phases;
    this.activePhaseIndex = activePhaseIndex;
    this.markCompletedPhases();
  }

  onActivePhaseUpdated(activePhaseIndex: number): void {
    this.activePhaseIndex = activePhaseIndex;
    this.markCompletedPhases();
    const current = this.items[activePhaseIndex];
    if (current) {
      current.isActive = true;
    }
  }

  private markCompletedPhases() {
    for (let i = 0; i < this.activePhaseIndex; i++) {
      this.items[i].primaryIcon = 'done';
      this.items[i].isActive = true;
    }
  }
}
