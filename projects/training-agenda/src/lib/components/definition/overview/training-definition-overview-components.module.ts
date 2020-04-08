import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ngfModule} from 'angular-file';
import {KypoPipesModule} from 'kypo-common';
import {CloneDialogComponent} from './clone-dialog/clone-dialog.component';
import {TrainingDefinitionOverviewMaterialModule} from './training-definition-overview-material.module';
import {TrainingDefinitionOverviewComponent} from './training-definition-overview.component';
import {Kypo2TableModule} from 'kypo2-table';
import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {TrainingDefinitionConcreteService} from '../../../services/training-definition/overview/training-definition.concrete.service';
import {FileUploadProgressService} from '../../../services/training-definition/overview/file-upload-progress.service';
import {KypoControlsModule} from 'kypo-controls';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';
import {TrainingDefinitionUploadDialogComponent} from './upload-dialog/training-definition-upload-dialog.component';
import {TrainingDefinitionDetailComponent} from './detail/training-definition-detail.component';
import {TrainingAgendaContext} from '../../../services/internal/training-agenda-context.service';
import {TrainingNavigator} from '../../../services/client/training-navigator.service';
import {TrainingDefaultNavigator} from '../../../services/client/training-default-navigator.service';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ngfModule,
      KypoPipesModule,
      TrainingDefinitionOverviewMaterialModule,
      ReactiveFormsModule,
      Kypo2TableModule,
      KypoControlsModule,
    ],
  declarations: [
    TrainingDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
  ],
  providers: [
    FileUploadProgressService,
    TrainingAgendaContext,
    {provide: TrainingNavigator, useClass: TrainingDefaultNavigator},
    {provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService}
  ]
})

export class TrainingDefinitionOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionOverviewComponentsModule> {
    return {
      ngModule: TrainingDefinitionOverviewComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
