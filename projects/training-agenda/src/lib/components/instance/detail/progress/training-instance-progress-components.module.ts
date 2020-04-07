import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
import {TrainingInstanceProgressMaterialModule} from './training-instance-progress-material.module';
import {TrainingInstanceProgressComponent} from './training-instance-progress.component';
import {TrainingAgendaConfig} from '../../../../model/client/training-agenda-config';

/**
 * Component imports, declarations and providers for training instance progress page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressMaterialModule,
  ],
  declarations: [
  TrainingInstanceProgressComponent
  ],
  providers: [
  ]
})
export class TrainingInstanceProgressComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceProgressComponentsModule> {
    return {
      ngModule: TrainingInstanceProgressComponentsModule,
      providers: [
        Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: config.visualizationConfig.trainingBasePath}).providers,
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
