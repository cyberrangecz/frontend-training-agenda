import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngfModule } from 'angular-file';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext, PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { FileUploadProgressService } from '../services/file-upload/file-upload-progress.service';
import { TrainingDefinitionConcreteService } from '../services/state/training-definition.concrete.service';
import { TrainingDefinitionService } from '../services/state/training-definition.service';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { TrainingDefinitionDetailComponent } from './detail/training-definition-detail.component';
import { TrainingDefinitionOverviewMaterialModule } from './training-definition-overview-material.module';
import { TrainingDefinitionOverviewComponent } from './training-definition-overview.component';
import { TrainingDefinitionUploadDialogComponent } from './upload-dialog/training-definition-upload-dialog.component';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ngfModule,
    SentinelPipesModule,
    TrainingDefinitionOverviewMaterialModule,
    ReactiveFormsModule,
    SentinelTableModule,
    SentinelControlsModule,
  ],
  declarations: [
    TrainingDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
  ],
  providers: [
    FileUploadProgressService,
    PaginationService,
    TrainingAgendaContext,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService },
  ],
})
export class TrainingDefinitionOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionOverviewComponentsModule> {
    return {
      ngModule: TrainingDefinitionOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
