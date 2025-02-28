import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceProgressComponentsModule } from '@crczp/training-agenda/instance-progress';
import { environment } from '../../../../../../environments/environment';
import { TrainingInstanceProgressRoutingModule } from './training-instance-progress-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceProgressComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingInstanceProgressRoutingModule,
    ],
})
export class TrainingInstanceProgressModule {}
