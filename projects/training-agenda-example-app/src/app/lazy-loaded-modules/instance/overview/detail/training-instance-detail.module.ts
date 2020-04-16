import { NgModule } from '@angular/core';
import { TrainingInstanceDetailComponentsModule } from 'kypo-training-agenda';
import { environment } from '../../../../../environments/environment';
import { TrainingInstanceDetailRoutingModule } from './training-instance-detail-routing.module';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule,
  ],
})
export class TrainingInstanceDetailModule {}
