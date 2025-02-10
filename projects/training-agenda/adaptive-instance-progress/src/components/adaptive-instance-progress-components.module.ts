import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AdaptiveVisualizationConfig, AdaptiveVisualizationLibModule } from '@cyberrangecz-platform/adaptive-visualization';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import { AdaptiveInstanceProgressMaterialModule } from './adaptive-instance-progress-material.module';
import { AdaptiveInstanceProgressComponent } from './adaptive-instance-progress.component';
import { TimelineModule } from '@cyberrangecz-platform/command-visualizations/timeline';

/**
 * Module containing components and providers for training instance progress page
 */
@NgModule({
  imports: [CommonModule, AdaptiveInstanceProgressMaterialModule, AdaptiveVisualizationLibModule, TimelineModule],
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
        TimelineModule.forRoot(config.visualizationConfig).providers,
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
