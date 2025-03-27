import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinearTrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import { environment } from '../../../../../environments/environment';
import { LinearTrainingDefinitionEditOverviewRoutingModule } from './linear-training-definition-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LinearTrainingDefinitionEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
        LinearTrainingDefinitionEditOverviewRoutingModule,
    ],
})
export class LinearTrainingDefinitionEditOverviewModule {}
