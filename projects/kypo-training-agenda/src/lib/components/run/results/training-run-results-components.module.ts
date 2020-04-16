import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Kypo2TrainingsVisualizationOverviewLibConfig,
  Kypo2TrainingsVisualizationOverviewLibModule,
} from 'kypo2-trainings-visualization-overview-lib';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { TrainingRunResultsMaterialModule } from './training-run-results-material.module';
import { TrainingRunResultsComponent } from './training-run-results.component';

/**
 * Module containing components for trainees results in game
 */
@NgModule({
  imports: [CommonModule, TrainingRunResultsMaterialModule, Kypo2TrainingsVisualizationOverviewLibModule],
  declarations: [TrainingRunResultsComponent],
})
export class TrainingRunResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunResultsComponentsModule> {
    return {
      ngModule: TrainingRunResultsComponentsModule,
      providers: [
        {
          provide: Kypo2TrainingsVisualizationOverviewLibConfig,
          useValue: { kypo2TrainingsVisualizationRestBasePath: config.visualizationConfig.trainingBasePath },
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
