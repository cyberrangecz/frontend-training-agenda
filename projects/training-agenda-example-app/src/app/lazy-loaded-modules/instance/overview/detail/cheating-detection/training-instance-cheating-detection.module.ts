import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionOverviewComponentsModule } from '@crczp/training-agenda/instance-cheating-detection';
import { environment } from '../../../../../../environments/environment';
import { CheatingDetectionOverviewRoutingModule } from './training-instance-cheating-detection-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CheatingDetectionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
        CheatingDetectionOverviewRoutingModule,
    ],
})
export class CheatingDetectionOverviewModule {}
