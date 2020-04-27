import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceEditOverviewComponentsModule } from '../../../../../../../kypo-training-agenda/src/lib/components/instance/edit/training-instance-edit-overview-components.module';
import { environment } from '../../../../../environments/environment';
import { TrainingInstanceEditOverviewRoutingModule } from './training-instance-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceEditOverviewRoutingModule,
    TrainingInstanceEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
  ],
})
export class TrainingInstanceEditOverviewModule {}
