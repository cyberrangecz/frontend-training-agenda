import {NgModule} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailComponentsModule} from 'kypo-training-agenda';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule
  ]
})
export class TrainingInstanceDetailModule {

}
