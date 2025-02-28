import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceResultsComponentsModule } from '@crczp/training-agenda/adaptive-instance-results';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveInstanceResultsRoutingModule } from './adaptive-instance-results-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveInstanceResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
        AdaptiveInstanceResultsRoutingModule,
    ],
})
export class AdaptiveInstanceResultsModule {}
