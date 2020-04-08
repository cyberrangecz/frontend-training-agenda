import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {KypoPipesModule} from 'kypo-common';
import {LevelComponentsModule} from './level/level-components.module';
import {TrainingRunDetailMaterialModule} from './training-run-detail-material.module';
import {TrainingRunDetailComponent} from './training-run-detail.component';
import {TrainingTimerComponent} from './training-timer/training-timer.component';
import {CsirtUserCardModule} from 'csirt-mu-layout';

/**
 * Contains all components of training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailMaterialModule,
    LevelComponentsModule,
    RouterModule,
    KypoPipesModule,
    Kypo2StepperModule,
    CsirtUserCardModule
  ],
  declarations: [
    TrainingRunDetailComponent,
    TrainingTimerComponent
  ],
  exports: [
    TrainingRunDetailComponent,
    TrainingTimerComponent
  ]
})
export class TrainingRunDetailComponentsModule {
}
