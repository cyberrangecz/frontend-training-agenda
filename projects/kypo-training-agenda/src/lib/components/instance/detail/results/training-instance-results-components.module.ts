import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Kypo2AssessmentConfig,
  Kypo2AssessmentsResultsVisualizationModule,
} from 'kypo2-assessments-results-visualization';
import {
  Kypo2TrainingsHurdlingVizLibConfig,
  Kypo2TrainingsHurdlingVizLibModule,
} from 'kypo2-trainings-hurdling-viz-lib';
import {
  Kypo2TrainingsVisualizationOverviewLibConfig,
  Kypo2TrainingsVisualizationOverviewLibModule,
} from 'kypo2-trainings-visualization-overview-lib';
import { TrainingAgendaConfig } from '../../../../model/client/training-agenda-config';
import { TrainingInstanceResultsMaterialModule } from './training-instance-results-material.module';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsMaterialModule,
    Kypo2TrainingsHurdlingVizLibModule,
    Kypo2AssessmentsResultsVisualizationModule,
    Kypo2TrainingsVisualizationOverviewLibModule,
  ],
  declarations: [TrainingInstanceResultsComponent],
  providers: [],
})
export class TrainingInstanceResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceResultsComponentsModule> {
    return {
      ngModule: TrainingInstanceResultsComponentsModule,
      providers: [
        {
          provide: Kypo2TrainingsVisualizationOverviewLibConfig,
          useValue: { kypo2TrainingsVisualizationRestBasePath: config.visualizationConfig.trainingBasePath },
        },
        {
          provide: Kypo2TrainingsHurdlingVizLibConfig,
          useValue: { restBaseUrl: config.visualizationConfig.trainingBasePath },
        },
        { provide: Kypo2AssessmentConfig, useValue: { restBaseUrl: config.visualizationConfig.trainingBasePath } },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
