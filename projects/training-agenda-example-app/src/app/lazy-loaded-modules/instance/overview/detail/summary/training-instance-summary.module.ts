import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceSummaryComponentsModule } from '../../../../../../../../kypo-training-agenda/src/lib/components/instance/detail/summary/training-instance-summary-components.module';
import { environment } from '../../../../../../environments/environment';
import { TrainingInstanceSummaryRoutingModule } from './training-instance-summary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceSummaryRoutingModule,
  ],
})
export class TrainingInstanceSummaryModule {}
