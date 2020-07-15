import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TrainingRunAssessmentLevelConcreteService,
  TrainingRunAssessmentLevelService,
  TrainingRunGameLevelConcreteService,
  TrainingRunGameLevelService,
} from 'kypo-training-agenda/internal';

/**
 * Module containing imports and providers for training run levels
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  providers: [
    { provide: TrainingRunGameLevelService, useClass: TrainingRunGameLevelConcreteService },
    { provide: TrainingRunAssessmentLevelService, useClass: TrainingRunAssessmentLevelConcreteService },
  ],
})
export class LevelModule {}
