import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceSummaryComponentsModule } from 'kypo-training-agenda/instance-summary';
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
