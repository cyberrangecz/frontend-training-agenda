import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import {
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { TrainingRunDetailComponentsModule } from '@muni-kypo-crp/training-agenda/run-detail';
import { TrainingPreviewComponent } from './training-preview.component';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { LevelComponentsModule } from './level/level-components.module';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [CommonModule, TrainingRunDetailComponentsModule, SentinelStepperModule, LevelComponentsModule],
  declarations: [TrainingPreviewComponent],
  providers: [TrainingDefinitionResolver, TrainingDefinitionBreadcrumbResolver],
})
export class TrainingPreviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingPreviewComponentsModule> {
    return {
      ngModule: TrainingPreviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
