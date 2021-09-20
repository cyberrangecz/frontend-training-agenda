import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AdaptiveVisualizationConfig, KypoAdaptiveVisualizationLibModule } from '@muni-kypo-crp/adaptive-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceResultsMaterialModule } from './adaptive-instance-results-material.module';
import { AdaptiveInstanceResultsComponent } from './adaptive-instance-results.component';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [CommonModule, AdaptiveInstanceResultsMaterialModule, KypoAdaptiveVisualizationLibModule],
  declarations: [AdaptiveInstanceResultsComponent],
  providers: [],
})
export class AdaptiveInstanceResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceResultsComponentsModule> {
    return {
      ngModule: AdaptiveInstanceResultsComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
