import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProvidersModule } from '../../shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@crczp/training-agenda/adaptive-definition-overview';
import { SandboxApiModule } from '@crczp/sandbox-api';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        AdaptiveDefinitionOverviewRoutingModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        AdaptiveDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class AdaptiveDefinitionOverviewModule {}
