import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {Kypo2TrainingsHurdlingVizLibConfig, Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
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
    Kypo2TrainingsHurdlingVizLibModule
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
        {provide: Kypo2TrainingsHurdlingVizLibConfig, useValue: {restBaseUrl: config.visualizationConfig.trainingBasePath}},
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
