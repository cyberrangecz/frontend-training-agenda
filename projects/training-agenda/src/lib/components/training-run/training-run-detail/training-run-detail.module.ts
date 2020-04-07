import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {LevelModule} from './level/level.module';
import {TrainingRunDetailComponentsModule} from './training-run-detail-components.module';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';
import {TrainingRunLevelsDeactivateGuard} from '../../../services/can-deactivate/training-run-levels-can-deactivate.service';

/**
 * Module containing imports and providers for training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    LevelModule,
    TrainingRunDetailComponentsModule,
    Kypo2StepperModule,
    TrainingRunDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunLevelsDeactivateGuard
  ]
})
export class TrainingRunDetailModule { }
