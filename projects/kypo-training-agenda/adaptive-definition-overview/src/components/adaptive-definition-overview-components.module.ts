import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngfModule } from 'angular-file';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext, PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveFileUploadProgressService } from '../services/file-upload/adaptive-file-upload-progress.service';
import { AdaptiveDefinitionConcreteService } from '../services/state/adaptive-definition.concrete.service';
import { AdaptiveDefinitionService } from '../services/state/adaptive-definition.service';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { TrainingDefinitionDetailComponent } from './detail/training-definition-detail.component';
import { AdaptiveDefinitionOverviewMaterialModule } from './adaptive-definition-overview-material.module';
import { AdaptiveDefinitionOverviewComponent } from './adaptive-definition-overview.component';
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
    AdaptiveDefinitionOverviewMaterialModule,
    ReactiveFormsModule,
    SentinelTableModule,
    SentinelControlsModule,
  ],
  declarations: [
    AdaptiveDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
  ],
  providers: [
    AdaptiveFileUploadProgressService,
    PaginationService,
    TrainingAgendaContext,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: AdaptiveDefinitionService, useClass: AdaptiveDefinitionConcreteService },
  ],
})
export class AdaptiveDefinitionOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveDefinitionOverviewComponentsModule> {
    return {
      ngModule: AdaptiveDefinitionOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
