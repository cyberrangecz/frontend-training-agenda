import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { LinearTrainingDefaultNavigator, TrainingAgendaConfig, TrainingNavigator } from '@crczp/training-agenda';
import { PaginationService, TrainingAgendaContext } from '@crczp/training-agenda/internal';
import {
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { LinearTrainingInstanceOverviewConcreteService } from '../services/state/linear-training-instance-overview-concrete.service';
import { TrainingInstanceOverviewService } from '../services/state/training-instance-overview.service';
import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';
import { TrainingInstanceOverviewMaterialModule } from './training-instance-overview-material.module';
import { LinearTrainingInstanceOverviewComponent } from './linear-training-instance-overview/linear-training-instance-overview.component';
import { CoopTrainingInstanceOverviewComponent } from './coop-training-instance-overview/linear-training-instance-overview.component';

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
    declarations: [
        TrainingInstanceOverviewComponent,
        LinearTrainingInstanceOverviewComponent,
        CoopTrainingInstanceOverviewComponent,
    ],
    providers: [
        PaginationService,
        TrainingAgendaContext,
        TrainingInstanceResolver,
        TrainingInstanceTitleResolver,
        TrainingInstanceBreadcrumbResolver,
        { provide: TrainingNavigator, useClass: LinearTrainingDefaultNavigator },
        { provide: TrainingInstanceOverviewService, useClass: LinearTrainingInstanceOverviewConcreteService },
    ],
    exports: [TrainingInstanceOverviewComponent],
})
export class TrainingInstanceOverviewComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceOverviewComponentsModule> {
        return {
            ngModule: TrainingInstanceOverviewComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
