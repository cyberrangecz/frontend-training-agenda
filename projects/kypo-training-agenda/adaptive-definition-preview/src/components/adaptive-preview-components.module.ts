import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import {
  AdaptiveDefinitionBreadcrumbResolver,
  AdaptiveDefinitionResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';

import { AdaptivePreviewComponent } from './adaptive-preview.component';
import { AdaptiveRunDetailComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-run-detail';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { PhaseComponentsModule } from './phase/phase-components.module';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [CommonModule, AdaptiveRunDetailComponentsModule, SentinelStepperModule, PhaseComponentsModule],
  declarations: [AdaptivePreviewComponent],
  providers: [AdaptiveDefinitionResolver, AdaptiveDefinitionBreadcrumbResolver],
})
export class AdaptivePreviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptivePreviewComponentsModule> {
    return {
      ngModule: AdaptivePreviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
