import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import {
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { PreviewAssessmentLevelService } from '../services/preview-assessment-level.service';
import { PreviewTrainingLevelService } from '../services/preview-training-level.service';
import { PreviewTrainingRunService } from '../services/preview-training-run.service';
import {
  RunningTrainingRunService,
  TrainingRunAccessLevelConcreteService,
  TrainingRunAccessLevelService,
  TrainingRunAssessmentLevelService,
  TrainingRunTrainingLevelService,
} from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunDetailComponentsModule } from '@muni-kypo-crp/training-agenda/run-detail';
import { TrainingPreviewComponent } from './training-preview.component';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [CommonModule, TrainingRunDetailComponentsModule, TrainingRunDetailComponentsModule],
  declarations: [TrainingPreviewComponent],
  providers: [
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    { provide: RunningTrainingRunService, useClass: PreviewTrainingRunService },
    { provide: TrainingRunTrainingLevelService, useClass: PreviewTrainingLevelService },
    { provide: TrainingRunAssessmentLevelService, useClass: PreviewAssessmentLevelService },
    { provide: TrainingRunAccessLevelService, useClass: TrainingRunAccessLevelConcreteService },
  ],
})
export class TrainingPreviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingPreviewComponentsModule> {
    return {
      ngModule: TrainingPreviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
