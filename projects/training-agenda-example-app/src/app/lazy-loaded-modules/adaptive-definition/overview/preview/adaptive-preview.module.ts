import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AdaptivePreviewRoutingModule } from './adaptive-preview-routing.module';
import { AdaptivePreviewComponentsModule } from '@crczp/training-agenda/adaptive-definition-preview';

@NgModule({
    imports: [
        CommonModule,
        AdaptivePreviewComponentsModule.forRoot(environment.trainingAgendaConfig),
        AdaptivePreviewRoutingModule,
    ],
})
export class AdaptivePreviewModule {}
