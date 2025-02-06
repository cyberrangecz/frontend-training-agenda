import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveInstanceEditOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-edit';
import { environment } from '../../../../../environments/environment';
import { AdaptiveInstanceEditOverviewRoutingModule } from './adaptive-instance-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceEditOverviewRoutingModule,
    AdaptiveInstanceEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceEditOverviewModule {}
