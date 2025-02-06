import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionEditOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-edit';
import { environment } from '../../../../../environments/environment';
import { AdaptiveDefinitionEditOverviewRoutingModule } from './adaptive-definition-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveDefinitionEditOverviewRoutingModule,
  ],
})
export class AdaptiveDefinitionEditOverviewModule {}
