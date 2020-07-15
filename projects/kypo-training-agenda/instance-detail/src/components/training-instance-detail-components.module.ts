import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from 'kypo-training-agenda';
import {
  TrainingInstanceDetailBreadcrumbResolver,
  TrainingInstanceDetailTitleResolver,
  TrainingInstanceResolver,
} from 'kypo-training-agenda/resolvers';

/**
 * Module containing components and providers for training instance detail agenda
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [TrainingInstanceResolver, TrainingInstanceDetailTitleResolver, TrainingInstanceDetailBreadcrumbResolver],
})
export class TrainingInstanceDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceDetailComponentsModule> {
    return {
      ngModule: TrainingInstanceDetailComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
