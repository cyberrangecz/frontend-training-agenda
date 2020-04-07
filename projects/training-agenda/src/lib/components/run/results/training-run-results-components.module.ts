import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {Kypo2TrainingsVisualizationOverviewLibModule} from 'kypo2-trainings-visualization-overview-lib';
import {TrainingRunResultsMaterialModule} from './training-run-results-material.module';
import {TrainingRunResultsComponent} from './training-run-results.component';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';

/**
 * Module containing components for trainees results in game
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsMaterialModule,
  ],
  declarations: [TrainingRunResultsComponent],
  providers: []
})
export class TrainingRunResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunResultsComponentsModule> {
    return {
      ngModule: TrainingRunResultsComponentsModule,
      providers: [
        Kypo2TrainingsVisualizationOverviewLibModule.forRoot({kypo2TrainingsVisualizationRestBasePath: config.visualizationConfig.trainingBasePath}).providers,
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
