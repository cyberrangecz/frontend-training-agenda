import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentinelUserCardModule } from '@sentinel/layout';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { AdaptiveRunDetailMaterialModule } from './adaptive-run-detail-material.module';
import { AdaptiveRunDetailComponent } from './adaptive-run-detail.component';
import { TrainingTimerComponent } from './training-timer/training-timer.component';
import { PhaseComponentsModule } from './phase/phase-components.module';

/**
 * Contains all components of adaptive run detail
 */
@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunDetailMaterialModule,
    PhaseComponentsModule,
    RouterModule,
    SentinelPipesModule,
    SentinelStepperModule,
    SentinelUserCardModule,
  ],
  declarations: [AdaptiveRunDetailComponent, TrainingTimerComponent],
  exports: [AdaptiveRunDetailComponent, TrainingTimerComponent],
})
export class AdaptiveRunDetailComponentsModule {}
