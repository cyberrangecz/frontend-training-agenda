import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AssessmentVisualizationConfig,
  Kypo2AssessmentsResultsVisualizationModule,
} from '@muni-kypo-crp/assessment-visualization';
import { HurdlingVisualizationConfig, Kypo2TrainingsHurdlingVizLibModule } from '@muni-kypo-crp/hurdling-visualization';
import {
  Kypo2TrainingsVisualizationOverviewLibModule,
  VisualizationOverviewConfig,
} from '@muni-kypo-crp/overview-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceResultsMaterialModule } from './training-instance-results-material.module';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';
import { SummaryGraphModule } from '@muni-kypo-crp/command-visualizations/summary-graph';
import { TimelineModule } from '@muni-kypo-crp/command-visualizations/timeline';
import { MistakeModule } from '@muni-kypo-crp/command-visualizations/mistake';
import { TraineeGraphModule } from '@muni-kypo-crp/command-visualizations/trainee-graph';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsMaterialModule,
    Kypo2TrainingsHurdlingVizLibModule,
    SummaryGraphModule,
    Kypo2AssessmentsResultsVisualizationModule,
    Kypo2TrainingsVisualizationOverviewLibModule,
    TimelineModule,
    MistakeModule,
    TraineeGraphModule,
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
        SummaryGraphModule.forRoot(config.visualizationConfig).providers,
        TimelineModule.forRoot(config.visualizationConfig).providers,
        MistakeModule.forRoot(config.visualizationConfig).providers,
        TraineeGraphModule.forRoot(config.visualizationConfig).providers,
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
