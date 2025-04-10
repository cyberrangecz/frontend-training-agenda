import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TeamManagementService } from '../services/team-management-service';
import { TeamsManagementComponent } from './teams-management.component';
import {
    GridListComponent,
    MatCardNotchTitleComponent,
    PlayerViewComponent,
    SelectableListComponent,
} from '@crczp/training-agenda/internal';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamsManagementMaterialModule } from './teams-management-material.module';
import { TeamManagementConcreteService } from '../services/team-management-concrete-service';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SelectableListComponent,
        GridListComponent,
        PlayerViewComponent,
        TeamsManagementMaterialModule,
        ReactiveFormsModule,
        MatCardNotchTitleComponent,
    ],
    declarations: [TeamsManagementComponent, TeamOverviewComponent],
    providers: [{ provide: TeamManagementService, useClass: TeamManagementConcreteService }],
})
export class TeamsManagementComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TeamsManagementComponentsModule> {
        return {
            ngModule: TeamsManagementComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
