import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import {
  TrainingDefinitionDetailBreadcrumbResolver,
  TrainingDefinitionDetailTitleResolver,
  TrainingDefinitionResolver,
} from '@cyberrangecz-platform/training-agenda/resolvers';

/**
 * Module containing components and providers for training definition detail agenda
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    TrainingDefinitionResolver,
    TrainingDefinitionDetailTitleResolver,
    TrainingDefinitionDetailBreadcrumbResolver,
  ],
})
export class TrainingDefinitionDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionDetailComponentsModule> {
    return {
      ngModule: TrainingDefinitionDetailComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
