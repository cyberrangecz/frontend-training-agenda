import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceResultsComponentsModule } from '../../../../../../../../kypo-training-agenda/src/lib/components/instance/detail/results/training-instance-results-components.module';
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
