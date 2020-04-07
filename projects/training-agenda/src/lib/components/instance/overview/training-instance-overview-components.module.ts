import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {FreeFormModule} from '../../shared/free-form.module';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {TrainingInstanceOverviewConcreteService} from '../../../services/training-instance/training-instance-overview-concrete.service';
import {Kypo2TableModule} from 'kypo2-table';
import {KypoControlsModule} from 'kypo-controls';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';

/**
 * Main module of training instance agenda. Contains components and providers for displaying table of training instance
 * and CRUD operations on them. It contains routing to more feature modules (detail atc.)
 */
@NgModule({
    imports: [
      CommonModule,
      FreeFormModule,
      FormsModule,
      ReactiveFormsModule,
      Kypo2TableModule,
      KypoControlsModule,
    ],
  declarations: [
    TrainingInstanceOverviewComponent,
  ],
  providers: [
    TrainingInstanceResolver,
    TrainingInstanceBreadcrumbResolver,
    { provide: TrainingInstanceOverviewService, useClass: TrainingInstanceOverviewConcreteService }
  ]
})

export class TrainingInstanceOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceOverviewComponentsModule> {
    return {
      ngModule: TrainingInstanceOverviewComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
