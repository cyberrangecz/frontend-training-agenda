import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingPreviewComponentsModule } from '@kypo/training-agenda/definition-preview';
import { environment } from '../../../../../environments/environment';
import { TrainingPreviewRoutingModule } from './training-preview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingPreviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingPreviewRoutingModule,
  ],
})
export class TrainingPreviewModule {}
