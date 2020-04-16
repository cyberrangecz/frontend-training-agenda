import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CsirtMuConfirmationDialogModule } from 'csirt-mu-common';
import { CsirtMuLayout1Module } from 'csirt-mu-layout';
import { Kypo2AuthInterceptor, Kypo2AuthModule } from 'kypo2-auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CsirtMuLayout1Module,
    CsirtMuConfirmationDialogModule,
    HttpClientModule,
    Kypo2AuthModule.forRoot(environment.kypo2AuthConfig),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Kypo2AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
