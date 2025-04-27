import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingRunDetailComponentsModule, TrainingRunDetailGameModule } from '@crczp/training-agenda/run-detail';
import { environment } from '../../../../../../environments/environment';
import { CoopTrainingRunDetailRoutingModule } from './coop-training-run-detail-routing.module';
import { TrainingTypeEnum } from '@crczp/training-model';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingRunDetailComponentsModule,
        TrainingRunDetailGameModule.forRoot(environment.trainingAgendaConfig, TrainingTypeEnum.COOP),
        CoopTrainingRunDetailRoutingModule,
    ],
})
export class CoopTrainingRunDetailModule {}
