import {NgModule} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {TrainingInstanceProgressRoutingModule} from './training-instance-progress-routing.module';
import {TrainingInstanceProgressComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceProgressRoutingModule
  ]
})
export class TrainingInstanceProgressModule {

}
