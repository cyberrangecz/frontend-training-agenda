import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingApiModule } from '@crczp/training-api';
import { TrainingRunOverviewComponentsModule } from '@crczp/training-agenda/run-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingRunOverviewRoutingModule } from './training-run-overview-routing.module';
import { SandboxApiModule } from '@crczp/sandbox-api';

@NgModule({
    imports: [
        CommonModule,
        SharedProvidersModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
        SandboxApiModule.forRoot(environment.sandboxApiConfig),
        TrainingRunOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingRunOverviewRoutingModule,
    ],
})
export class TrainingRunOverviewModule {}
