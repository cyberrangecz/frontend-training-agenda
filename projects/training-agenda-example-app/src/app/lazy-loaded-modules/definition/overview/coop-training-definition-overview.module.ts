import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { CoopTrainingDefinitionOverviewComponentsModule } from '@crczp/training-agenda/definition-overview';
import { CoopTrainingDefinitionOverviewRoutingModule } from './coop-training-definition-overview-routing.module';
import { CoopTrainingDefinitionResolver, CoopTrainingDefinitionTitleResolver } from '@crczp/training-agenda/resolvers';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        CoopTrainingDefinitionOverviewRoutingModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        CoopTrainingDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
    providers: [CoopTrainingDefinitionResolver, CoopTrainingDefinitionTitleResolver],
})
export class CoopTrainingDefinitionOverviewModule {}
