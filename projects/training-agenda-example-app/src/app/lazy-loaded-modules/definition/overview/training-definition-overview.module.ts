import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoTrainingApiModule } from '@kypo/training-api';
import { TrainingDefinitionOverviewComponentsModule } from '@kypo/training-agenda/definition-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class TrainingDefinitionOverviewModule {}
