import { NgModule } from '@angular/core';
import { AdaptiveDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { environment } from '../../../../../environments/environment';
import { AdaptiveDefinitionDetailRoutingModule } from './adaptive-definition-detail-routing.module';

@NgModule({
    imports: [
        AdaptiveDefinitionDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        AdaptiveDefinitionDetailRoutingModule,
    ],
})
export class AdaptiveDefinitionDetailModule {}
