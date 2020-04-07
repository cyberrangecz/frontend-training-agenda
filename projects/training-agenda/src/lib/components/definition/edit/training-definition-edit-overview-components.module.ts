import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KypoPipesModule} from 'kypo-common';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {AuthorsAssignService} from '../../../services/training-definition/authors-assign/authors-assign.service';
import {TrainingDefinitionEditService} from '../../../services/training-definition/edit/training-definition-edit.service';
import {FreeFormModule} from '../../shared/free-form.module';
import {LevelOverviewComponentModule} from './levels-edit/level-overview-component.module';
import {TrainingDefinitionEditOverviewMaterialModule} from './training-definition-edit-overview-material.module';
import {TrainingDefinitionEditOverviewComponent} from './training-definition-edit-overview.component';
import {TrainingDefinitionEditComponent} from './training-definition-edit/training-definition-edit.component';
import {Kypo2UserAssignModule, Kypo2UserAssignService} from 'kypo2-user-assign';
import {KypoControlsModule} from 'kypo-controls';
import {TrainingDefinitionCanDeactivate} from '../../../services/can-deactivate/training-definition-can-deactivate.service';
import {TrainingDefinitionEditConcreteService} from '../../../services/training-definition/edit/training-definition-edit-concrete.service';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FreeFormModule,
        Kypo2UserAssignModule,
        TrainingDefinitionEditOverviewMaterialModule,
        LevelOverviewComponentModule,
        KypoPipesModule,
        ReactiveFormsModule,
        KypoControlsModule,
    ],
  declarations: [
    TrainingDefinitionEditOverviewComponent,
    TrainingDefinitionEditComponent,
  ],
  providers: [
    TrainingDefinitionCanDeactivate,
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    {provide: TrainingDefinitionEditService, useClass: TrainingDefinitionEditConcreteService},
    {provide: Kypo2UserAssignService, useClass: AuthorsAssignService},
  ]
})

export class TrainingDefinitionEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionEditOverviewComponentsModule> {
    return {
      ngModule: TrainingDefinitionEditOverviewComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
