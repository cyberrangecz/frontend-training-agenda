import {NgModule} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TrainingDefinitionEditOverviewComponentsModule} from 'training-agenda';
import {CommonModule} from '@angular/common';
import {TrainingDefinitionEditOverviewRoutingModule} from './training-definition-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingDefinitionEditOverviewRoutingModule
  ]
})
export class TrainingDefinitionEditOverviewModule {

}
