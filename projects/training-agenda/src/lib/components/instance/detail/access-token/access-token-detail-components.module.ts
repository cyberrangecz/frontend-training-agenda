import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {AccessTokenDetailComponent} from './access-token-detail.component';
import {TrainingAgendaConfig} from '../../../../model/client/training-agenda-config';

/**
 * Module containing components and providers for the access token page
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [
  AccessTokenDetailComponent
  ]
})

export class AccessTokenDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AccessTokenDetailComponentsModule> {
    return {
      ngModule: AccessTokenDetailComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
