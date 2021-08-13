import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelUserAssignModule } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionCanDeactivate } from '../services/can-deactivate/training-definition-can-deactivate.service';
import {
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
  TrainingDefinitionTitleResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { TrainingDefinitionEditComponent } from './definition/training-definition-edit.component';
import { LevelOverviewComponentsModule } from './levels/level-overview-components.module';
import { TrainingDefinitionEditOverviewMaterialModule } from './training-definition-edit-overview-material.module';
import { TrainingDefinitionEditOverviewComponent } from './training-definition-edit-overview.component';
import { SentinelFreeFormModule } from '@sentinel/components/free-form';
import { LevelEditService } from '../services/state/level/level-edit.service';
import { LevelEditConcreteService } from '../services/state/level/level-edit-concrete.service';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SentinelUserAssignModule,
    TrainingDefinitionEditOverviewMaterialModule,
    LevelOverviewComponentsModule,
    SentinelPipesModule,
    ReactiveFormsModule,
    SentinelControlsModule,
    SentinelFreeFormModule,
  ],
  declarations: [TrainingDefinitionEditOverviewComponent, TrainingDefinitionEditComponent],
  providers: [
    TrainingDefinitionCanDeactivate,
    TrainingDefinitionResolver,
    TrainingDefinitionTitleResolver,
    TrainingDefinitionBreadcrumbResolver,
    { provide: LevelEditService, useClass: LevelEditConcreteService },
  ],
})
export class TrainingDefinitionEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionEditOverviewComponentsModule> {
    return {
      ngModule: TrainingDefinitionEditOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
