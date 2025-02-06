import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessTokenDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-access-token';
import { environment } from '../../../../../../environments/environment';
import { AccessTokenDetailRoutingModule } from './access-token-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    AccessTokenDetailRoutingModule,
  ],
})
export class AccessTokenDetailModule {}
