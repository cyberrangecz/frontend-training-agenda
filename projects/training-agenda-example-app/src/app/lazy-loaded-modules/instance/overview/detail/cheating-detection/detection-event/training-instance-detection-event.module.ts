import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventComponentsModule } from '@crczp/training-agenda/instance-detection-event';
import { environment } from '../../../../../../../environments/environment';
import { TrainingInstanceDetectionEventRoutingModule } from './training-instance-detection-event-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceDetectionEventComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingInstanceDetectionEventRoutingModule,
    ],
})
export class TrainingInstanceDetectionEventModule {}
