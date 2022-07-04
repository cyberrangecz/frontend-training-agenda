import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { CommonModule } from '@angular/common';
import {
  AdaptiveInstanceResolver,
  AdaptiveInstanceDetailTitleResolver,
  AdaptiveInstanceDetailBreadcrumbResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';

/**
 * Module containing components and providers for training instance detail agenda
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AdaptiveInstanceResolver, AdaptiveInstanceDetailTitleResolver, AdaptiveInstanceDetailBreadcrumbResolver],
})
export class AdaptiveInstanceDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceDetailComponentsModule> {
    return {
      ngModule: AdaptiveInstanceDetailComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
