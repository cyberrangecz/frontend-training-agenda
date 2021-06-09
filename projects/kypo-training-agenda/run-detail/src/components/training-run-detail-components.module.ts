import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentinelUserCardModule } from '@sentinel/layout/user-card';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { LevelComponentsModule } from './level/level-components.module';
import { TrainingRunDetailMaterialModule } from './training-run-detail-material.module';
import { TrainingRunDetailComponent } from './training-run-detail.component';
import { TrainingTimerComponent } from './training-timer/training-timer.component';

/**
 * Contains all components of training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailMaterialModule,
    LevelComponentsModule,
    RouterModule,
    SentinelPipesModule,
    SentinelStepperModule,
    SentinelUserCardModule,
  ],
  declarations: [TrainingRunDetailComponent, TrainingTimerComponent],
  exports: [TrainingRunDetailComponent, TrainingTimerComponent],
})
export class TrainingRunDetailComponentsModule {}
