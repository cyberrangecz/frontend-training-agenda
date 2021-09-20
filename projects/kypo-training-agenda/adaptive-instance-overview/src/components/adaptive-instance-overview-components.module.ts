import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import {
  AdaptiveInstanceResolver,
  AdaptiveInstanceTitleResolver,
  AdaptiveInstanceBreadcrumbResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { AdaptiveInstanceOverviewComponent } from './adaptive-instance-overview.component';
import { AdaptiveInstanceOverviewService } from '../services/state/adaptive-instance-overview.service';
import { AdaptiveInstanceOverviewConcreteService } from '../services/state/adaptive-instance-overview-concrete.service';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveInstanceOverviewMaterialModule } from './adaptive-instance-overview-material.module';

/**
 * Main module of training instance agenda. Contains components and providers for displaying table of training instance
 * and CRUD operations on them. It contains routing to more feature modules (detail atc.)
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SentinelTableModule,
    SentinelControlsModule,
    AdaptiveInstanceOverviewMaterialModule,
  ],
  declarations: [AdaptiveInstanceOverviewComponent],
  providers: [
    TrainingAgendaContext,
    PaginationService,
    AdaptiveInstanceResolver,
    AdaptiveInstanceTitleResolver,
    AdaptiveInstanceBreadcrumbResolver,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: AdaptiveInstanceOverviewService, useClass: AdaptiveInstanceOverviewConcreteService },
  ],
})
export class AdaptiveInstanceOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceOverviewComponentsModule> {
    return {
      ngModule: AdaptiveInstanceOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
