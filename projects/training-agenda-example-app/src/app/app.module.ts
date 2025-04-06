import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelConfirmationDialogComponent } from '@sentinel/components/dialogs';
import { SentinelLayout1Module } from '@sentinel/layout/layout1';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentinelAuthModule } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { HomeComponent } from './home/home.component';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './services/loading-interceptor';
import { TokenRefreshService } from './services/token-refresh.service';
import { TokenRefreshInterceptor } from './services/token-refresh-interceptor';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SentinelLayout1Module,
        SentinelConfirmationDialogComponent,
        HttpClientModule,
        SentinelAuthModule.forRoot(environment.authConfig),
    ],
    providers: [
        SentinelAuthGuardWithLogin,
        SentinelNegativeAuthGuard,
        LoadingService,
        TokenRefreshService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
