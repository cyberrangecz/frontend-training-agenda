import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { CoopTrainingInstanceOverviewComponentsModule } from '../../../../../../training-agenda/instance-overview/src/components/coop-training-instance-overview-components.module';
import { CoopTrainingInstanceOverviewRoutingModule } from './coop-training-instance-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        CoopTrainingInstanceOverviewRoutingModule,
        CoopTrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class CoopTrainingInstanceOverviewModule {}
