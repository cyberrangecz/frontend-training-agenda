import { NgModule } from '@angular/core';
import { TrainingErrorHandler, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { ClientErrorHandlerService } from '../services/client-error-handler.service';
import { ClientNotificationService } from '../services/client-notification.service';

@NgModule({
  providers: [
    { provide: TrainingErrorHandler, useClass: ClientErrorHandlerService },
    { provide: TrainingNotificationService, useClass: ClientNotificationService },
  ],
})
export class SharedProvidersModule {}
