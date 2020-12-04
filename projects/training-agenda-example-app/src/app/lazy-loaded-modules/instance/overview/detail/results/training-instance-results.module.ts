import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceResultsComponentsModule } from '@muni-kypo-crp/training-agenda/instance-results';
import { environment } from '../../../../../../environments/environment';
import { TrainingInstanceResultsRoutingModule } from './training-instance-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceResultsRoutingModule,
  ],
})
export class TrainingInstanceResultsModule {}
