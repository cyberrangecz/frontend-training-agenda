import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Kypo2TrainingsVisualizationOverviewLibModule,
  VisualizationOverviewConfig,
} from '@muni-kypo-crp/overview-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingRunResultsMaterialModule } from './training-run-results-material.module';
import { TrainingRunResultsComponent } from './training-run-results.component';

/**
 * Module containing components for trainees results in training
 */
@NgModule({
  imports: [CommonModule, TrainingRunResultsMaterialModule, Kypo2TrainingsVisualizationOverviewLibModule],
  declarations: [TrainingRunResultsComponent],
})
export class TrainingRunResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunResultsComponentsModule> {
    const visualizationConfig: VisualizationOverviewConfig = {
      trainingServiceUrl: config.visualizationConfig.trainingBasePath,
      elasticSearchServiceUrl: config.visualizationConfig.elasticSearchBasePath,
    };
    return {
      ngModule: TrainingRunResultsComponentsModule,
      providers: [
        {
          provide: VisualizationOverviewConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
