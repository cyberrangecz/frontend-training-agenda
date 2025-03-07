import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingApiModule } from '@crczp/training-api';
import { TrainingDefinitionOverviewLinearComponentsModule } from '@crczp/training-agenda/definition-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';
import { SandboxApiModule } from '@crczp/sandbox-api';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingDefinitionOverviewRoutingModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        TrainingDefinitionOverviewLinearComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class TrainingDefinitionOverviewModule {}
