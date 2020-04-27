import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { KypoTrainingApiModule } from 'kypo-training-api';
import { TrainingInstanceOverviewComponentsModule } from '../../../../../../kypo-training-agenda/src/lib/components/instance/overview/training-instance-overview-components.module';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingInstanceOverviewRoutingModule } from './training-instance-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class TrainingInstanceOverviewModule {}
