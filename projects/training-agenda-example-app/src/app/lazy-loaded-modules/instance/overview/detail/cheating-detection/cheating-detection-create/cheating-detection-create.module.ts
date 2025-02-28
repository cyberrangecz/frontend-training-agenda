import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceCheatingDetectionEditComponentsModule } from '@crczp/training-agenda/instance-cheating-detection-edit';
import { environment } from '../../../../../../../environments/environment';
import { CheatingDetectionEditRoutingModule } from './cheating-detection-create-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceCheatingDetectionEditComponentsModule.forRoot(environment.trainingAgendaConfig),
        CheatingDetectionEditRoutingModule,
    ],
})
export class CheatingDetectionCreateOverviewModule {}
