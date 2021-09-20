import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AdaptiveVisualizationConfig, KypoAdaptiveVisualizationLibModule } from '@muni-kypo-crp/adaptive-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceProgressMaterialModule } from './adaptive-instance-progress-material.module';
import { AdaptiveInstanceProgressComponent } from './adaptive-instance-progress.component';

/**
 * Module containing components and providers for training instance progress page
 */
@NgModule({
  imports: [CommonModule, AdaptiveInstanceProgressMaterialModule, KypoAdaptiveVisualizationLibModule],
  declarations: [AdaptiveInstanceProgressComponent],
  providers: [],
})
export class AdaptiveInstanceProgressComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceProgressComponentsModule> {
    const visualizationConfig = {
      adaptiveTrainingServiceUrl: config.visualizationConfig.adaptiveBasePath,
    };
    return {
      ngModule: AdaptiveInstanceProgressComponentsModule,
      providers: [
        {
          provide: AdaptiveVisualizationConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
