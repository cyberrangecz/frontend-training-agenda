import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingApiModule } from '@crczp/training-api';
import { LinearTrainingDefinitionOverviewComponentsModule } from '@crczp/training-agenda/definition-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { LinearTrainingDefinitionOverviewRoutingModule } from './linear-training-definition-overview-routing.module';
import { SandboxApiModule } from '@crczp/sandbox-api';
import {
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        LinearTrainingDefinitionOverviewRoutingModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        LinearTrainingDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
    providers: [LinearTrainingDefinitionResolver, LinearTrainingDefinitionTitleResolver],
})
export class LinearTrainingDefinitionOverviewModule {}
