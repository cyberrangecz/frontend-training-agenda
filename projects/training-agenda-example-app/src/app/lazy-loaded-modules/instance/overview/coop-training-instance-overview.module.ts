import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { CoopTrainingInstanceOverviewComponentsModule } from '@crczp/training-agenda/instance-overview';
import { CoopTrainingInstanceOverviewRoutingModule } from './coop-training-instance-overview-routing.module';
import { CoopTrainingDefaultNavigator, LinearTrainingNavigator } from '@crczp/training-agenda';
import {
    CoopTrainingInstanceResolver,
    CoopTrainingInstanceTitleResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        CoopTrainingInstanceOverviewRoutingModule,
        CoopTrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
    providers: [
        CoopTrainingInstanceResolver,
        CoopTrainingInstanceTitleResolver,
        { provide: LinearTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingInstanceResolver, useExisting: CoopTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useClass: CoopTrainingInstanceTitleResolver },
    ],
})
export class CoopTrainingInstanceOverviewModule {}
