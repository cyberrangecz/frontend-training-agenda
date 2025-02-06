import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { TrainingDefinitionSummaryRoutingModule } from './training-definition-summary-routing.module';
import { TrainingDefinitionSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/definition-summary';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingDefinitionSummaryRoutingModule,
  ],
})
export class TrainingDefinitionSummaryModule {}
