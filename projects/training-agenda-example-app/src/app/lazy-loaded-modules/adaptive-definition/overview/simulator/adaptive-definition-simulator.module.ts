import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AdaptiveDefinitionSimulatorRoutingModule } from './adaptive-definition-simulator-routing.module';
import { AdaptiveDefinitionSimulatorComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-simulator';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionSimulatorComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveDefinitionSimulatorRoutingModule,
  ],
})
export class AdaptiveDefinitionSimulatorModule {}
