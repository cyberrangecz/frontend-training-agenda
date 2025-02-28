import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import { environment } from '../../../../../environments/environment';
import { TrainingDefinitionEditOverviewRoutingModule } from './training-definition-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingDefinitionEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingDefinitionEditOverviewRoutingModule,
    ],
})
export class TrainingDefinitionEditOverviewModule {}
