import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import { CommonModule } from '@angular/common';
import {
  AdaptiveInstanceDetailBreadcrumbResolver,
  AdaptiveInstanceDetailTitleResolver,
  AdaptiveInstanceResolver,
} from '@cyberrangecz-platform/training-agenda/resolvers';

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
