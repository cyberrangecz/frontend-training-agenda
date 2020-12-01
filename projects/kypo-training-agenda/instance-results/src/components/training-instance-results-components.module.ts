import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AssessmentVisualizationConfig,
  Kypo2AssessmentsResultsVisualizationModule,
} from '@kypo/assessment-visualization';
import { HurdlingVisualizationConfig, Kypo2TrainingsHurdlingVizLibModule } from '@kypo/hurdling-visualization';
import {
  Kypo2TrainingsVisualizationOverviewLibModule,
  VisualizationOverviewConfig,
} from '@kypo/overview-visualization';
import { TrainingAgendaConfig } from '@kypo/training-agenda';
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
    const visualizationConfig = {
      trainingServiceUrl: config.visualizationConfig.trainingBasePath,
      elasticSearchServiceUrl: config.visualizationConfig.elasticSearchBasePath,
    };
    return {
      ngModule: TrainingInstanceResultsComponentsModule,
      providers: [
        {
          provide: VisualizationOverviewConfig,
          useValue: visualizationConfig,
        },
        {
          provide: HurdlingVisualizationConfig,
          useValue: visualizationConfig,
        },
        {
          provide: AssessmentVisualizationConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
