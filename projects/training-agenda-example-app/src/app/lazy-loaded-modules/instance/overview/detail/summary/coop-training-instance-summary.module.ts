import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingInstanceSummaryComponentsModule } from '@crczp/training-agenda/instance-summary';
import { environment } from '../../../../../../environments/environment';
import { CoopTrainingInstanceSummaryRoutingModule } from './coop-training-instance-summary-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingInstanceSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
        CoopTrainingInstanceSummaryRoutingModule,
    ],
})
export class CoopTrainingInstanceSummaryModule {}
