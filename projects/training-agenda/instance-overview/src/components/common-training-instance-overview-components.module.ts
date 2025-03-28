import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { PaginationService, TrainingAgendaContext } from '@crczp/training-agenda/internal';
import {
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';
import { TrainingInstanceOverviewMaterialModule } from './training-instance-overview-material.module';
import { TrainingTypeEnum } from '@crczp/training-model';

/**
 * Main module of training instance agenda. Contains components and providers for displaying table of training instance
 * and CRUD operations on them. It contains routing to more feature modules (detail atc.)
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SentinelTableModule,
        SentinelControlsComponent,
        TrainingInstanceOverviewMaterialModule,
    ],
    declarations: [TrainingInstanceOverviewComponent],
    providers: [
        PaginationService,
        TrainingAgendaContext,
        TrainingInstanceResolver,
        TrainingInstanceTitleResolver,
        TrainingInstanceBreadcrumbResolver,
    ],
    exports: [TrainingInstanceOverviewComponent],
})
export class CommonTrainingInstanceOverviewComponentsModule {
    public static TRAINING_TYPE_TOKEN = new InjectionToken<TrainingTypeEnum>('TRAINING_TYPE_TOKEN');
}
