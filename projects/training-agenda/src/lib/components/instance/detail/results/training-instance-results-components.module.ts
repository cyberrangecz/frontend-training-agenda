import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TrainingInstanceResultsMaterialModule} from './training-instance-results-material.module';
import {TrainingInstanceResultsComponent} from './training-instance-results.component';
import {Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
import {Kypo2AssessmentsResultsVisualizationModule} from 'kypo2-assessments-results-visualization';
import {Kypo2TrainingsVisualizationOverviewLibModule} from 'kypo2-trainings-visualization-overview-lib';
import {TrainingAgendaConfig} from '../../../../model/client/training-agenda-config';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsMaterialModule,
  ],
  declarations: [
    TrainingInstanceResultsComponent
  ],
  providers: [
  ]
})
export class TrainingInstanceResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceResultsComponentsModule> {
    return {
      ngModule: TrainingInstanceResultsComponentsModule,
      providers: [
        Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: config.visualizationConfig.trainingBasePath}).providers,
        Kypo2AssessmentsResultsVisualizationModule.forRoot({restBaseUrl: config.visualizationConfig.trainingBasePath}).providers,
        Kypo2TrainingsVisualizationOverviewLibModule.forRoot({kypo2TrainingsVisualizationRestBasePath: config.visualizationConfig.trainingBasePath}).providers,
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
