import { NgModule } from '@angular/core';
import { LinearTrainingInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';
import { environment } from '../../../../../environments/environment';
import { LinearTrainingInstanceDetailRoutingModule } from './linear-training-instance-detail-routing.module';

@NgModule({
    imports: [
        LinearTrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        LinearTrainingInstanceDetailRoutingModule,
    ],
})
export class LinearTrainingInstanceDetailModule {}
