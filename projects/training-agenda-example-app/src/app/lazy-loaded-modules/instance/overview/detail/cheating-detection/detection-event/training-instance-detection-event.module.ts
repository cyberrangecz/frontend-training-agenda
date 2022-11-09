import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { TrainingInstanceDetectionEventRoutingModule } from './training-instance-detection-event-routing.module';
import { TrainingInstanceDetectionEventComponentsModule } from '../../../../../../../../../kypo-training-agenda/instance-detection-event/src/components/training-instance-detection-event-components.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetectionEventRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventModule {}
