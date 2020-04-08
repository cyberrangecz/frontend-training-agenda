import {NgModule} from '@angular/core';
import {ClientErrorHandlerService} from '../services/client-error-handler.service';
import {ClientNotificationService} from '../services/client-notification.service';
import {TrainingErrorHandler, TrainingNotificationService} from 'kypo-training-agenda';

@NgModule({
  providers: [
    {provide: TrainingErrorHandler, useClass: ClientErrorHandlerService},
    {provide: TrainingNotificationService, useClass: ClientNotificationService}
  ]
})
export class SharedProvidersModule {
}
