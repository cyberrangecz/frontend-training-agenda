import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunDetailGameModule } from '../../../../../../../kypo-training-agenda/src/lib/components/run/detail/training-run-detail-game.module';
import { environment } from '../../../../../environments/environment';
import { TrainingRunDetailRoutingModule } from './training-run-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunDetailRoutingModule,
  ],
})
export class TrainingRunDetailModule {}
