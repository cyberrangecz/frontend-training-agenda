import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {PreviewAssessmentLevelService} from '../../../services/training-definition/preview/preview-assessment-level.service';
import {PreviewGameLevelService} from '../../../services/training-definition/preview/preview-game-level.service';
import {PreviewTrainingRunService} from '../../../services/training-definition/preview/preview-training-run.service';
import {TrainingPreviewComponent} from './training-preview.component';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {TrainingRunGameLevelService} from '../../../services/training-run/running/training-run-game-level.service';
import {TrainingRunAssessmentLevelService} from '../../../services/training-run/running/training-run-assessment-level.service';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';
import {TrainingRunDetailComponentsModule} from '../../run/detail/training-run-detail-components.module';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailComponentsModule
  ],
  declarations: [
    TrainingPreviewComponent,
  ],
  providers: [
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    { provide: RunningTrainingRunService, useClass: PreviewTrainingRunService },
    { provide: TrainingRunGameLevelService, useClass: PreviewGameLevelService },
    { provide: TrainingRunAssessmentLevelService, useClass: PreviewAssessmentLevelService },
  ],
})
export class TrainingPreviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingPreviewComponentsModule> {
    return {
      ngModule: TrainingPreviewComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
