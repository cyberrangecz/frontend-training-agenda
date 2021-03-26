import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProvidersModule } from '../../shared-providers.module';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { environment } from '../../../../environments/environment';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { AdaptiveInstanceOverviewRoutingModule } from './adaptive-instance-overview-routing.module';
import { AdaptiveInstanceOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-overview';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    AdaptiveInstanceOverviewRoutingModule,
    AdaptiveInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceOverviewModule {}
