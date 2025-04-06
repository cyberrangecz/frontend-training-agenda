import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinearTrainingInstanceSummaryComponentsModule } from '@crczp/training-agenda/instance-summary';
import { environment } from '../../../../../../environments/environment';
import { LinearTrainingInstanceSummaryRoutingModule } from './linear-training-instance-summary-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LinearTrainingInstanceSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
        LinearTrainingInstanceSummaryRoutingModule,
    ],
})
export class LinearTrainingInstanceSummaryModule {}
