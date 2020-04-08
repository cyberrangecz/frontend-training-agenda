import {NgModule} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';
import {TrainingRunDetailGameModule} from 'training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunDetailRoutingModule
  ]
})
export class TrainingRunDetailModule {

}
