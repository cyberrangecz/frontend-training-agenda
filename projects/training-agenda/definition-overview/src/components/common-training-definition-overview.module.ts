import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngfModule } from 'angular-file';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { PaginationService, TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { FileUploadProgressService } from '../services/file-upload/file-upload-progress.service';
import { TrainingDefinitionService } from '../services/state/training-definition.service';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { TrainingDefinitionDetailComponent } from './detail/training-definition-detail.component';
import { TrainingDefinitionOverviewMaterialModule } from './training-definition-overview-material.module';
import { TrainingDefinitionOverviewComponent } from './training-definition-overview.component';
import { TrainingDefinitionUploadDialogComponent } from './upload-dialog/training-definition-upload-dialog.component';
import { TrainingDefinitionBreadcrumbResolver } from '@crczp/training-agenda/resolvers';
import { TrainingDefinitionConcreteService } from '../services/state/training-definition-concrete.service';
import { TrainingTypeEnum } from '@crczp/training-model';

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
export class CommonTrainingDefinitionOverviewComponentsModule {
    public static TRAINING_TYPE_TOKEN = new InjectionToken<TrainingTypeEnum>('TRAINING_TYPE_TOKEN');

    static forRoot(type: TrainingTypeEnum): ModuleWithProviders<CommonTrainingDefinitionOverviewComponentsModule> {
        return {
            ngModule: CommonTrainingDefinitionOverviewComponentsModule,

            providers: [
                FileUploadProgressService,
                PaginationService,
                TrainingAgendaContext,
                TrainingDefinitionBreadcrumbResolver,
                { provide: this.TRAINING_TYPE_TOKEN, useValue: type },
                { provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService },
            ],
        };
    }
}
