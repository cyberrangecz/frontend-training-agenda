import { NgModule } from '@angular/core';
import { TrainingDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { environment } from '../../../../../environments/environment';
import { TrainingDefinitionDetailRoutingModule } from './training-definition-detail-routing.module';

@NgModule({
    imports: [
        TrainingDefinitionDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingDefinitionDetailRoutingModule,
    ],
})
export class TrainingDefinitionDetailModule {}
