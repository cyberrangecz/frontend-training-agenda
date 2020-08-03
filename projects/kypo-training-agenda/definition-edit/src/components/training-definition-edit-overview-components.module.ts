import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelUserAssignModule, SentinelUserAssignService } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from 'kypo-training-agenda';
import { TrainingDefinitionCanDeactivate } from '../services/can-deactivate/training-definition-can-deactivate.service';
import {
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
  TrainingDefinitionTitleResolver,
} from 'kypo-training-agenda/resolvers';
import { AuthorsAssignService } from '../services/state/authors-assign/authors-assign.service';
import { TrainingDefinitionEditConcreteService } from '../services/state/edit/training-definition-edit-concrete.service';
import { TrainingDefinitionEditService } from '../services/state/edit/training-definition-edit.service';
import { TrainingDefinitionEditComponent } from './definition/training-definition-edit.component';
import { LevelOverviewComponentsModule } from './levels/level-overview-components.module';
import { TrainingDefinitionEditOverviewMaterialModule } from './training-definition-edit-overview-material.module';
import { TrainingDefinitionEditOverviewComponent } from './training-definition-edit-overview.component';
import { SentinelFreeFormModule } from '@sentinel/components/free-form';

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
    { provide: TrainingDefinitionEditService, useClass: TrainingDefinitionEditConcreteService },
    { provide: SentinelUserAssignService, useClass: AuthorsAssignService },
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
