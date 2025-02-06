import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import {
  AdaptiveDefinitionDetailBreadcrumbResolver,
  AdaptiveDefinitionDetailTitleResolver,
  AdaptiveDefinitionResolver,
} from '@cyberrangecz-platform/training-agenda/resolvers';

/**
 * Module containing components and providers for adaptive training definition detail agenda
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    AdaptiveDefinitionResolver,
    AdaptiveDefinitionDetailTitleResolver,
    AdaptiveDefinitionDetailBreadcrumbResolver,
  ],
})
export class AdaptiveDefinitionDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveDefinitionDetailComponentsModule> {
    return {
      ngModule: AdaptiveDefinitionDetailComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
