import { NgModule } from '@angular/core';
import { TrainingErrorHandler } from '../../../../kypo-training-agenda/src/lib/services/client/training-error.handler.service';
import { TrainingNotificationService } from '../../../../kypo-training-agenda/src/lib/services/client/training-notification.service';
import { ClientErrorHandlerService } from '../services/client-error-handler.service';
import { ClientNotificationService } from '../services/client-notification.service';

@NgModule({
  providers: [
    { provide: TrainingErrorHandler, useClass: ClientErrorHandlerService },
    { provide: TrainingNotificationService, useClass: ClientNotificationService },
  ],
})
export class SharedProvidersModule {}
