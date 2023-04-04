import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventDetailComponentsModule } from '@muni-kypo-crp/training-agenda/instance-detection-event-detail';
import { environment } from '../../../../../../../../environments/environment';
import { TrainingInstanceDetectionEventDetailRoutingModule } from './training-instance-detection-event-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetectionEventDetailRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventDetailModule {}
