import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {AccessTokenDetailComponent} from './access-token-detail.component';

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

export class AccessTokenDetailComponentModule {

}
