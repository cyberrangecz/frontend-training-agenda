import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunResultsComponentsModule } from '@crczp/training-agenda/run-results';
import { environment } from '../../../../../../environments/environment';
import { TrainingRunResultsRoutingModule } from './training-run-results-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingRunResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingRunResultsRoutingModule,
    ],
})
export class TrainingRunResultsModule {}
