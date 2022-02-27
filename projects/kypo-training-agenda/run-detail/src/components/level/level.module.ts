import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TrainingRunAssessmentLevelConcreteService,
  TrainingRunAssessmentLevelService,
  TrainingRunTrainingLevelConcreteService,
  TrainingRunTrainingLevelService,
} from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunAccessLevelService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunAccessLevelConcreteService } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Module containing imports and providers for training run levels
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  providers: [
    { provide: TrainingRunTrainingLevelService, useClass: TrainingRunTrainingLevelConcreteService },
    { provide: TrainingRunAssessmentLevelService, useClass: TrainingRunAssessmentLevelConcreteService },
    { provide: TrainingRunAccessLevelService, useClass: TrainingRunAccessLevelConcreteService },
  ],
})
export class LevelModule {}
