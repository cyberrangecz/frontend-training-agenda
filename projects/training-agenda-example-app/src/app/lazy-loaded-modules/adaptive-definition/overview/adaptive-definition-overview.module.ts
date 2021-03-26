import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProvidersModule } from '../../shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { environment } from '../../../../environments/environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-definition-overview';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    AdaptiveDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    AdaptiveDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class AdaptiveDefinitionOverviewModule {}
