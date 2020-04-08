import {NgModule} from '@angular/core';
import {TrainingRunResultsRoutingModule} from './training-run-results-routing.module';
import {environment} from '../../../../../environments/environment';
import {TrainingRunResultsComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunResultsRoutingModule
  ]
})
export class TrainingRunResultsModule {

}
