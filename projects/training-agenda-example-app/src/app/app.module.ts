import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelConfirmationDialogModule } from '@sentinel/components/dialogs';
import { SentinelLayout1Module } from '@sentinel/layout/layout1';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentinelAuthModule } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SentinelLayout1Module,
    SentinelConfirmationDialogModule,
    HttpClientModule,
    SentinelAuthModule.forRoot(environment.authConfig),
  ],
  providers: [SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
