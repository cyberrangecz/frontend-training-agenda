import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelUserAssignModule, SentinelUserAssignService } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { TrainingDefinitionCanDeactivate } from '../../../services/can-deactivate/training-definition-can-deactivate.service';
import { TrainingDefinitionBreadcrumbResolver } from '../../../services/resolvers/definition/training-definition-breadcrumb-resolver.service';
import { TrainingDefinitionResolver } from '../../../services/resolvers/definition/training-definition-resolver.service';
import { TrainingDefinitionTitleResolver } from '../../../services/resolvers/definition/training-definition-title-resolver.service';
import { AuthorsAssignService } from '../../../services/training-definition/authors-assign/authors-assign.service';
import { TrainingDefinitionEditConcreteService } from '../../../services/training-definition/edit/training-definition-edit-concrete.service';
import { TrainingDefinitionEditService } from '../../../services/training-definition/edit/training-definition-edit.service';
import { FreeFormModule } from '../../shared/free-form.module';
import { TrainingDefinitionEditComponent } from './definition/training-definition-edit.component';
import { LevelOverviewComponentsModule } from './levels/level-overview-components.module';
import { TrainingDefinitionEditOverviewMaterialModule } from './training-definition-edit-overview-material.module';
import { TrainingDefinitionEditOverviewComponent } from './training-definition-edit-overview.component';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FreeFormModule,
    SentinelUserAssignModule,
    TrainingDefinitionEditOverviewMaterialModule,
    LevelOverviewComponentsModule,
    SentinelPipesModule,
    ReactiveFormsModule,
    SentinelControlsModule,
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
