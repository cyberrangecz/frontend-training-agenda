import {NgModule} from '@angular/core';
import {KypoTrainingApiModule} from 'kypo-training-api';
import {environment} from '../../../../environments/environment';
import {SharedProvidersModule} from '../../shared-providers.module';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponentsModule} from 'training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    TrainingRunOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunOverviewRoutingModule
  ]
})
export class TrainingRunOverviewModule {

}
