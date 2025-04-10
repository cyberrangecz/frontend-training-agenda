import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveDefinitionSummaryRoutingModule } from './adaptive-definition-summary-routing.module';
import { AdaptiveDefinitionSummaryComponentsModule } from '@crczp/training-agenda/adaptive-definition-summary';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveDefinitionSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
        AdaptiveDefinitionSummaryRoutingModule,
    ],
})
export class AdaptiveDefinitionSummaryModule {}
