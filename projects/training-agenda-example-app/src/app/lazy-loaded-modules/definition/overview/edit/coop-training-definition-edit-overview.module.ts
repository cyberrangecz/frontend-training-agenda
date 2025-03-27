import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import { environment } from '../../../../../environments/environment';
import { CoopTrainingDefinitionEditOverviewRoutingModule } from './coop-training-definition-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingDefinitionEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
        CoopTrainingDefinitionEditOverviewRoutingModule,
    ],
})
export class CoopTrainingDefinitionEditOverviewModule {}
