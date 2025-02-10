import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@cyberrangecz-platform/training-agenda/mitre-techniques';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { environment } from '../../../environments/environment';
import { SharedProvidersModule } from '../shared-providers.module';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    MitreTechniquesComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingApiModule.forRoot(environment.trainingApiConfig),
    MitreTechniquesRoutingModule,
  ],
})
export class MitreTechniquesModule {}
