import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveRunResultsComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-run-results';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveRunResultsRoutingModule } from './adaptive-run-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveRunResultsRoutingModule,
  ],
})
export class AdaptiveRunResultsModule {}
