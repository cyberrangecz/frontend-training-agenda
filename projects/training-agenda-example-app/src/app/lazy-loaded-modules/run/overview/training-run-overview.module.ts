import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoTrainingApiModule } from '@cyberrangecz-platform/training-api';
import { TrainingRunOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/run-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingRunOverviewRoutingModule } from './training-run-overview-routing.module';
import { KypoSandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    TrainingRunOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunOverviewRoutingModule,
  ],
})
export class TrainingRunOverviewModule {}
