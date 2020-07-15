import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { LevelEditConcreteService } from '../../services/state/level/level-edit-concrete.service';
import { LevelEditService } from '../../services/state/level/level-edit.service';
import { FreeFormModule } from 'kypo-training-agenda/internal';
import { LevelEditComponentsModule } from './level/level-edit-components.module';
import { LevelOverviewComponent } from './overview/level-overview.component';
import { TrainingLevelStepperComponent } from './stepper/training-level-stepper.component';

/**
 * Module containing component and providers for training definition levels' overview
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SentinelPipesModule,
    LevelEditComponentsModule,
    ReactiveFormsModule,
    FreeFormModule,
    SentinelStepperModule,
    MatDividerModule,
    SentinelControlsModule,
  ],
  declarations: [TrainingLevelStepperComponent, LevelOverviewComponent],
  providers: [{ provide: LevelEditService, useClass: LevelEditConcreteService }],
  exports: [LevelOverviewComponent],
})
export class LevelOverviewComponentsModule {}
