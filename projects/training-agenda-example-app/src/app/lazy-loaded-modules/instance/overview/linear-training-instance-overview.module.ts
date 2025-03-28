import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { LinearTrainingInstanceOverviewRoutingModule } from './linear-training-instance-overview-routing.module';
import { LinearTrainingInstanceOverviewComponentsModule } from '../../../../../../training-agenda/instance-overview/src/components/linear-training-instance-overview-components.module';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        LinearTrainingInstanceOverviewRoutingModule,
        LinearTrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class LinearTrainingInstanceOverviewModule {}
