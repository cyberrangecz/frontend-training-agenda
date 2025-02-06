import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProvidersModule } from '../../shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { KypoTrainingApiModule } from '@cyberrangecz-platform/training-api';
import { environment } from '../../../../environments/environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-overview';
import { KypoSandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    AdaptiveDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    AdaptiveDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class AdaptiveDefinitionOverviewModule {}
