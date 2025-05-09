import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { LinearTrainingInstanceOverviewRoutingModule } from './linear-training-instance-overview-routing.module';
import { LinearTrainingInstanceOverviewComponentsModule } from '@crczp/training-agenda/instance-overview';
import { LinearTrainingDefaultNavigator, LinearTrainingNavigator, TrainingNavigator } from '@crczp/training-agenda';
import {
    LinearTrainingInstanceResolver,
    LinearTrainingInstanceTitleResolver,
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        LinearTrainingInstanceOverviewRoutingModule,
        LinearTrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
    providers: [
        LinearTrainingInstanceResolver,
        LinearTrainingInstanceTitleResolver,
        { provide: LinearTrainingNavigator, useClass: LinearTrainingDefaultNavigator },
        { provide: TrainingInstanceResolver, useExisting: LinearTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useExisting: LinearTrainingInstanceTitleResolver },
    ],
})
export class LinearTrainingInstanceOverviewModule {}
