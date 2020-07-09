import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { TrainingDefaultNavigator } from '../../../services/client/training-default-navigator.service';
import { TrainingNavigator } from '../../../services/client/training-navigator.service';
import { TrainingAgendaContext } from '../../../services/internal/training-agenda-context.service';
import { TrainingInstanceBreadcrumbResolver } from '../../../services/resolvers/instance/training-instance-breadcrumb-resolver.service';
import { TrainingInstanceResolver } from '../../../services/resolvers/instance/training-instance-resolver.service';
import { TrainingInstanceTitleResolver } from '../../../services/resolvers/instance/training-instance-title-resolver.service';
import { TrainingInstanceOverviewConcreteService } from '../../../services/training-instance/training-instance-overview-concrete.service';
import { TrainingInstanceOverviewService } from '../../../services/training-instance/training-instance-overview.service';
import { FreeFormModule } from '../../shared/free-form.module';
import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';

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
    SentinelTableModule,
    SentinelControlsModule,
  ],
  declarations: [TrainingInstanceOverviewComponent],
  providers: [
    TrainingAgendaContext,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
    TrainingInstanceBreadcrumbResolver,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: TrainingInstanceOverviewService, useClass: TrainingInstanceOverviewConcreteService },
  ],
})
export class TrainingInstanceOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceOverviewComponentsModule> {
    return {
      ngModule: TrainingInstanceOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
