import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceProgressComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-progress';
import { environment } from '../../../../../../environments/environment';
import { AdaptiveInstanceProgressRoutingModule } from './adaptive-instance-progress-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceProgressComponentsModule.forRoot(environment.trainingAgendaConfig),
    AdaptiveInstanceProgressRoutingModule,
  ],
})
export class AdaptiveInstanceProgressModule {}
