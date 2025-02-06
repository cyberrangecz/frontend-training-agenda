import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoTrainingApiModule } from '@cyberrangecz-platform/training-api';
import { TrainingDefinitionOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/definition-overview';
import { environment } from '../../../../environments/environment';
import { SharedProvidersModule } from '../../shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';
import { KypoSandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class TrainingDefinitionOverviewModule {}
