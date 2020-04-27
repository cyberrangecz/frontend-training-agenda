import { NgModule } from '@angular/core';
import { TrainingInstanceDetailComponentsModule } from '../../../../../../../kypo-training-agenda/src/lib/components/instance/detail/training-instance-detail-components.module';
import { environment } from '../../../../../environments/environment';
import { TrainingInstanceDetailRoutingModule } from './training-instance-detail-routing.module';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule,
  ],
})
export class TrainingInstanceDetailModule {}
