import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { TrainingInstanceOverviewComponentsModule } from '@crczp/training-agenda/instance-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingInstanceOverviewRoutingModule } from './training-instance-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        TrainingInstanceOverviewRoutingModule,
        TrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class TrainingInstanceOverviewModule {}
