import {NgModule} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import {TrainingInstanceSummaryComponentsModule} from 'training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceSummaryRoutingModule
  ]
})
export class TrainingInstanceSummaryModule {

}
