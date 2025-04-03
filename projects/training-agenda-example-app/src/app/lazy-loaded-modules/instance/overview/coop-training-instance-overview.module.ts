import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { CoopTrainingInstanceOverviewComponentsModule } from '@crczp/training-agenda/instance-overview';
import { CoopTrainingInstanceOverviewRoutingModule } from './coop-training-instance-overview-routing.module';
import {
    CoopTrainingInstanceResolver,
    CoopTrainingInstanceTitleResolver,
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopTrainingDefaultNavigator, CoopTrainingNavigator, TrainingNavigator } from '@crczp/training-agenda';

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
        { provide: CoopTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingInstanceResolver, useClass: CoopTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useClass: CoopTrainingInstanceTitleResolver },
        TrainingInstanceBreadcrumbResolver,
    ],
})
export class CoopTrainingInstanceOverviewModule {}
