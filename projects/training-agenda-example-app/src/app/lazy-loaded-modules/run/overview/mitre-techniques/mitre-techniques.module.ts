import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@cyberrangecz-platform/training-agenda/mitre-techniques';
import { environment } from '../../../../../environments/environment';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MitreTechniquesComponentsModule.forRoot(environment.trainingAgendaConfig),
    MitreTechniquesRoutingModule,
  ],
})
export class MitreTechniquesModule {}
