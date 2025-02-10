import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { environment } from '../../../../environments/environment';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';
import { AdaptiveInstanceOverviewRoutingModule } from './adaptive-instance-overview-routing.module';
import { AdaptiveInstanceOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-overview';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    TrainingApiModule.forRoot(environment.trainingApiConfig),
    SandboxApiModule.forRoot(environment.sandboxApiConfig),
    AdaptiveInstanceOverviewRoutingModule,
    AdaptiveInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceOverviewModule {}
