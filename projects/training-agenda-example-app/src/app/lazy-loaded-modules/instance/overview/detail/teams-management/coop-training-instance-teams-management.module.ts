import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { CoopTrainingInstanceTeamsManagementRoutingModule } from './coop-training-instance-teams-management-routing.module';
import { TeamsManagementComponentsModule } from '../../../../../../../../training-agenda/instance-team-management/src/components/teams-management-components.module';

@NgModule({
    imports: [
        CommonModule,
        TeamsManagementComponentsModule.forRoot(environment.trainingAgendaConfig),
        CoopTrainingInstanceTeamsManagementRoutingModule,
    ],
})
export class CoopTrainingInstanceTeamsManagementModule {}
