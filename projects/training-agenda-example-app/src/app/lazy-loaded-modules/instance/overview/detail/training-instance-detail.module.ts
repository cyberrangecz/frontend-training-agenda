import { NgModule } from '@angular/core';
import { LinearTrainingInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';
import { environment } from '../../../../../environments/environment';
import { TrainingInstanceDetailRoutingModule } from './training-instance-detail-routing.module';

@NgModule({
    imports: [
        LinearTrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingInstanceDetailRoutingModule,
    ],
})
export class TrainingInstanceDetailModule {}
