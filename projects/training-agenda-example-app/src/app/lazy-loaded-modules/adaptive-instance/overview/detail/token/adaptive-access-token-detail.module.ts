import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveAccessTokenDetailComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-access-token';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveAccessTokenDetailRoutingModule } from './adaptive-access-token-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveAccessTokenDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveAccessTokenDetailRoutingModule,
  ],
})
export class AdaptiveAccessTokenDetailModule {}
