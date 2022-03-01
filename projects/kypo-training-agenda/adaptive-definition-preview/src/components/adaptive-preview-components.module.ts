import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import {
  AdaptiveDefinitionBreadcrumbResolver,
  AdaptiveDefinitionResolver,
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { AdaptivePreviewTrainingPhaseService } from '../services/adaptive-preview-training-phase.service';
import { AdaptivePreviewTrainingRunService } from '../services/adaptive-preview-training-run.service';
import {
  AdaptiveRunAccessPhaseConcreteService,
  AdaptiveRunAccessPhaseService,
  AdaptiveRunTrainingPhaseService,
  RunningAdaptiveRunService,
} from '@muni-kypo-crp/training-agenda/internal';
import { AdaptivePreviewComponent } from './adaptive-preview.component';
import { AdaptiveRunDetailComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-run-detail';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [CommonModule, AdaptiveRunDetailComponentsModule],
  declarations: [AdaptivePreviewComponent],
  providers: [
    AdaptiveDefinitionResolver,
    AdaptiveDefinitionBreadcrumbResolver,
    { provide: RunningAdaptiveRunService, useClass: AdaptivePreviewTrainingRunService },
    { provide: AdaptiveRunTrainingPhaseService, useClass: AdaptivePreviewTrainingPhaseService },
    { provide: AdaptiveRunAccessPhaseService, useClass: AdaptiveRunAccessPhaseConcreteService },
  ],
})
export class AdaptivePreviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptivePreviewComponentsModule> {
    return {
      ngModule: AdaptivePreviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
