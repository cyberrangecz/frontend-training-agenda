import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngfModule } from 'angular-file';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { TrainingDefaultNavigator, TrainingNavigator } from '@crczp/training-agenda';
import { PaginationService, TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { FileUploadProgressService } from '../services/file-upload/file-upload-progress.service';
import { TrainingDefinitionService } from '../services/state/training-definition.service';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { TrainingDefinitionDetailComponent } from './detail/training-definition-detail.component';
import { TrainingDefinitionOverviewMaterialModule } from './training-definition-overview-material.module';
import { TrainingDefinitionOverviewComponent } from './training-definition-overview.component';
import { TrainingDefinitionUploadDialogComponent } from './upload-dialog/training-definition-upload-dialog.component';
import {
    TrainingDefinitionBreadcrumbResolver,
    TrainingDefinitionResolver,
    TrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { TrainingDefinitionConcreteService } from '../services/state/training-definition.concrete.service';
import { TrainingDefinitionApi } from '@crczp/training-api';
import { LinearTrainingDefinitionApi } from '@crczp/training-api/lib/api/definition/linear-training-definition-api.service';
import { CoopTrainingDefinitionApi } from '@crczp/training-api/lib/api/definition/coop-training-definition-api.service';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ngfModule,
        TrainingDefinitionOverviewMaterialModule,
        ReactiveFormsModule,
        SentinelTableModule,
        SentinelControlsComponent,
        SentinelPipesModule,
    ],
    declarations: [
        TrainingDefinitionOverviewComponent,
        TrainingDefinitionUploadDialogComponent,
        CloneDialogComponent,
        TrainingDefinitionDetailComponent,
    ],
    exports: [
        TrainingDefinitionOverviewComponent,
        TrainingDefinitionUploadDialogComponent,
        CloneDialogComponent,
        TrainingDefinitionDetailComponent,
    ],
})
export class TrainingDefinitionOverviewComponentsCommonModule {
    static forRoot(type: 'linear' | 'coop'): ModuleWithProviders<TrainingDefinitionOverviewComponentsCommonModule> {
        return {
            ngModule: TrainingDefinitionOverviewComponentsCommonModule,

            providers: [
                FileUploadProgressService,
                PaginationService,
                TrainingAgendaContext,
                TrainingDefinitionBreadcrumbResolver,
                TrainingDefinitionResolver,
                TrainingDefinitionTitleResolver,
                {
                    provide: TrainingDefinitionApi,
                    useExisting: 'linear' === type ? LinearTrainingDefinitionApi : CoopTrainingDefinitionApi,
                },
                { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
                { provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService },
            ],
        };
    }
}
