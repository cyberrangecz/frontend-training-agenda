import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import {
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { AdaptivePreviewTrainingLevelService } from '../services/adaptive-preview-training-level.service';
import { AdaptivePreviewTrainingRunService } from '../services/adaptive-preview-training-run.service';
import {
  AdaptiveRunAccessPhaseConcreteService,
  AdaptiveRunAccessPhaseService,
  AdaptiveRunTrainingPhaseConcreteService,
  AdaptiveRunTrainingPhaseService,
  RunningAdaptiveRunService,
  TrainingRunTrainingLevelService,
} from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunDetailComponentsModule } from '@muni-kypo-crp/training-agenda/run-detail';
import { AdaptivePreviewComponent } from './adaptive-preview.component';
import { AdaptiveRunDetailComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-run-detail';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailComponentsModule,
    TrainingRunDetailComponentsModule,
    AdaptiveRunDetailComponentsModule,
  ],
  declarations: [AdaptivePreviewComponent],
  providers: [
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    { provide: RunningAdaptiveRunService, useClass: AdaptivePreviewTrainingRunService },
    { provide: TrainingRunTrainingLevelService, useClass: AdaptivePreviewTrainingLevelService },
    { provide: AdaptiveRunAccessPhaseService, useClass: AdaptiveRunAccessPhaseConcreteService },
    { provide: AdaptiveRunTrainingPhaseService, useClass: AdaptiveRunTrainingPhaseConcreteService },
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
