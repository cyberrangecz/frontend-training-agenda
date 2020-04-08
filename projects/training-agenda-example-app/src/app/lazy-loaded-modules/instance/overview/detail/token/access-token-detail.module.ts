import {NgModule} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AccessTokenDetailRoutingModule} from './access-token-detail-routing.module';
import {AccessTokenDetailComponentsModule} from 'training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    AccessTokenDetailRoutingModule
  ]
})
export class AccessTokenDetailModule {

}
