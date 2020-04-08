import {NgModule} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TrainingPreviewRoutingModule} from './training-preview-routing.module';
import {TrainingPreviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TrainingPreviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingPreviewRoutingModule
  ]
})
export class TrainingPreviewModule {

}
