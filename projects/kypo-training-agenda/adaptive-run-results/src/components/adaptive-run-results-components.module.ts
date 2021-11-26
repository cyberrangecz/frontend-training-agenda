import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AdaptiveTransitionVisualizationConfig,
  KypoAdaptiveTransitionVisualizationModule,
} from '@muni-kypo-crp/adaptive-transition-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveRunResultsMaterialModule } from './adaptive-run-results-material.module';
import { AdaptiveRunResultsComponent } from './adaptive-run-results.component';

/**
 * Module containing components for trainees results in training
 */
@NgModule({
  imports: [CommonModule, AdaptiveRunResultsMaterialModule, KypoAdaptiveTransitionVisualizationModule],
  declarations: [AdaptiveRunResultsComponent],
})
export class AdaptiveRunResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveRunResultsComponentsModule> {
    const visualizationConfig: AdaptiveTransitionVisualizationConfig = {
      trainingServiceUrl: config.visualizationConfig.adaptiveBasePath,
    };
    return {
      ngModule: AdaptiveRunResultsComponentsModule,
      providers: [
        {
          provide: AdaptiveTransitionVisualizationConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
