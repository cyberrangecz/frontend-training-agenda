import { NgModule } from '@angular/core';
import { AdaptiveInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';
import { environment } from '../../../../../environments/environment';
import { AdaptiveInstanceDetailRoutingModule } from './adaptive-instance-detail-routing.module';

@NgModule({
    imports: [
        AdaptiveInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        AdaptiveInstanceDetailRoutingModule,
    ],
})
export class AdaptiveInstanceDetailModule {}
