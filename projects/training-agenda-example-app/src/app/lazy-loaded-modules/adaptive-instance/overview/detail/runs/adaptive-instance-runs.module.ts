import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceRunsComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-runs';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveInstanceRunsRoutingModule } from './adaptive-instance-runs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceRunsComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveInstanceRunsRoutingModule,
  ],
})
export class AdaptiveInstanceRunsModule {}
