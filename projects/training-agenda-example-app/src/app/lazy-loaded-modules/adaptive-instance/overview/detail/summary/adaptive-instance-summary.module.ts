import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveInstanceSummaryRoutingModule } from './adaptive-instance-summary-routing.module';
import { AdaptiveInstanceSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-summary';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveInstanceSummaryRoutingModule,
  ],
})
export class AdaptiveInstanceSummaryModule {}
