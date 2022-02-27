import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AdaptiveRunTrainingPhaseConcreteService,
  AdaptiveRunTrainingPhaseService,
} from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveRunAccessPhaseService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveRunAccessPhaseConcreteService } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Module containing imports and providers for training run levels
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  providers: [
    { provide: AdaptiveRunTrainingPhaseService, useClass: AdaptiveRunTrainingPhaseConcreteService },
    { provide: AdaptiveRunAccessPhaseService, useClass: AdaptiveRunAccessPhaseConcreteService },
  ],
})
export class PhaseModule {}
