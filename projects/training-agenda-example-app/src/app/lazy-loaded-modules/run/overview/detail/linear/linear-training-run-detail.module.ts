import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunDetailGameModule } from '@crczp/training-agenda/run-detail';
import { environment } from '../../../../../../environments/environment';
import { LinearTrainingRunDetailRoutingModule } from './linear-training-run-detail-routing.module';
import { TrainingTypeEnum } from '@crczp/training-model';

@NgModule({
    imports: [
        CommonModule,
        TrainingRunDetailGameModule.forRoot(environment.trainingAgendaConfig, TrainingTypeEnum.LINEAR),
        LinearTrainingRunDetailRoutingModule,
    ],
})
export class LinearTrainingRunDetailModule {}
