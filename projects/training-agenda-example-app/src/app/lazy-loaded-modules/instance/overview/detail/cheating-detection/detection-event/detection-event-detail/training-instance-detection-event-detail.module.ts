import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../../../environments/environment';
import { TrainingInstanceDetectionEventRoutingModule } from '../training-instance-detection-event-routing.module';
import { TrainingInstanceDetectionEventComponentsModule } from '@muni-kypo-crp/training-agenda/instance-detection-event';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetectionEventRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventDetailModule {}
