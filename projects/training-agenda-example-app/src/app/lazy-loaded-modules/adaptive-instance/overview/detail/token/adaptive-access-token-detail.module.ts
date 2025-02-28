import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveAccessTokenDetailRoutingModule } from './adaptive-access-token-detail-routing.module';
import { AccessTokenDetailComponentsModule } from '@crczp/training-agenda/instance-access-token';

@NgModule({
    imports: [
        CommonModule,
        AccessTokenDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        AdaptiveAccessTokenDetailRoutingModule,
    ],
})
export class AdaptiveAccessTokenDetailModule {}
