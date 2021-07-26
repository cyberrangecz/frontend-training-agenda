import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelUserAssignModule } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveDefinitionCanDeactivate } from '../services/can-deactivate/adaptive-definition-can-deactivate.service';
import { AdaptiveTrainingDefinitionEditComponent } from './adaptive-definition/adaptive-training-definition-edit.component';
import { AdaptiveDefinitionEditOverviewMaterialModule } from './adaptive-definition-edit-overview-material.module';
import { AdaptiveDefinitionEditOverviewComponent } from './adaptive-definition-edit-overview.component';
import { SentinelFreeFormModule } from '@sentinel/components/free-form';
import { PhaseOverviewComponentsModule } from './phases/phase-overview-components.module';
import {
  AdaptiveDefinitionResolver,
  AdaptiveDefinitionBreadcrumbResolver,
  AdaptiveDefinitionTitleResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SentinelUserAssignModule,
    AdaptiveDefinitionEditOverviewMaterialModule,
    SentinelPipesModule,
    ReactiveFormsModule,
    SentinelControlsModule,
    SentinelFreeFormModule,
    PhaseOverviewComponentsModule,
  ],
  declarations: [AdaptiveDefinitionEditOverviewComponent, AdaptiveTrainingDefinitionEditComponent],
  providers: [
    AdaptiveDefinitionCanDeactivate,
    AdaptiveDefinitionResolver,
    AdaptiveDefinitionTitleResolver,
    AdaptiveDefinitionBreadcrumbResolver,
  ],
})
export class AdaptiveDefinitionEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveDefinitionEditOverviewComponentsModule> {
    return {
      ngModule: AdaptiveDefinitionEditOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
