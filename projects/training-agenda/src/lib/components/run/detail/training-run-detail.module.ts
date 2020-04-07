import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {LevelModule} from './level/level.module';
import {TrainingRunDetailComponentsModule} from './training-run-detail-components.module';
import {TrainingRunDetailRoutingModule} from '../../../../../../training-agenda-example-app/src/app/lazy-loaded-modules/run/detail/training-run-detail-routing.module';
import {TrainingRunLevelsDeactivateGuard} from '../../../services/can-deactivate/training-run-levels-can-deactivate.service';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';

/**
 * Module containing imports and providers for training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    LevelModule,
    Kypo2StepperModule,
    TrainingRunDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunLevelsDeactivateGuard
  ]
})
export class TrainingRunDetailModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunDetailModule> {
    return {
      ngModule: TrainingRunDetailModule,
      providers: [
        TrainingRunDetailComponentsModule.forRoot(config).providers,
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
