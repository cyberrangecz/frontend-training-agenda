import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceProgressComponentsModule } from '@crczp/training-agenda/instance-progress';
import { environment } from '../../../../../../environments/environment';
import { InstanceProgressRoutingModule } from './instance-progress-routing.module';
import { TrainingTypeEnum } from '@crczp/training-model';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceProgressComponentsModule.forRoot(environment.trainingAgendaConfig, TrainingTypeEnum.COOP),
        InstanceProgressRoutingModule,
    ],
})
export class LinearInstanceProgressModule {}
