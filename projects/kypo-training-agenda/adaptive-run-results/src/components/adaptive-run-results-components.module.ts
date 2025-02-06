import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AdaptiveTransitionVisualizationConfig,
  KypoAdaptiveTransitionVisualizationModule,
} from '@cyberrangecz-platform/adaptive-transition-visualization';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { MitreTechniquesOverviewConcreteService } from '../service/mitre-techniques-concrete.service';
import { MitreTechniquesOverviewService } from '../service/mitre-techniques.service';
import { AdaptiveRunResultsMaterialModule } from './adaptive-run-results-material.module';
import { AdaptiveRunResultsComponent } from './adaptive-run-results.component';

/**
 * Module containing components for trainees results in training
 */
@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunResultsMaterialModule,
    KypoAdaptiveTransitionVisualizationModule,
    SentinelControlsComponent,
  ],
  declarations: [AdaptiveRunResultsComponent],
  providers: [{ provide: MitreTechniquesOverviewService, useClass: MitreTechniquesOverviewConcreteService }],
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
