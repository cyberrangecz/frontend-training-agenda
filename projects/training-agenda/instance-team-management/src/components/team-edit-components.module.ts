import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TeamManagementService } from '../services/team-management-service';
import { TeamsManagementComponent } from './teams-management.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { SelectableListComponent } from '@crczp/training-agenda/internal';
import { GridListComponent } from '@crczp/training-agenda/internal';
import { PlayerViewComponent } from '@crczp/training-agenda/internal';
import { MatInput } from '@angular/material/input';
import { TeamOverviewComponent } from './team-overview/team-overview.component';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatCard,
        MatIcon,
        MatButton,
        MatTooltip,
        MatCardContent,
        SelectableListComponent,
        GridListComponent,
        PlayerViewComponent,
        MatInput,
        MatFabButton,
        TeamOverviewComponent,
        MatIconButton,
    ],
    declarations: [TeamsManagementComponent],
    providers: [TeamManagementService as Provider],
})
export class TeamEditComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TeamEditComponentsModule> {
        return {
            ngModule: TeamEditComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
