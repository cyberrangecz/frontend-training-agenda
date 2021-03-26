import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveRunDetailGameModule } from '@muni-kypo-crp/training-agenda/adaptive-run-detail';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveRunDetailRoutingModule } from './adaptive-run-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunDetailGameModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveRunDetailRoutingModule,
  ],
})
export class AdaptiveRunDetailModule {}
