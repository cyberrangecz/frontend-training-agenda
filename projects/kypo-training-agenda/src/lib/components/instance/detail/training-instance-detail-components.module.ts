import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TrainingInstanceDetailBreadcrumbResolver} from '../../../services/resolvers/instance/training-instance-detail-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/instance/training-instance-resolver.service';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';
import {TrainingInstanceDetailTitleResolver} from '../../../services/resolvers/instance/training-instance-detail-title-resolver.service';

/**
 * Module containing components and providers for training instance detail agenda
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingInstanceResolver,
    TrainingInstanceDetailTitleResolver,
    TrainingInstanceDetailBreadcrumbResolver
  ]
})

export class TrainingInstanceDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceDetailComponentsModule> {
    return {
      ngModule: TrainingInstanceDetailComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
