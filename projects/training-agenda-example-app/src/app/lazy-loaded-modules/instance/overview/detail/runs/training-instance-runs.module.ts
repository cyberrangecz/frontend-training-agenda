import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceRunsComponentsModule } from '@crczp/training-agenda/instance-runs';
import { environment } from '../../../../../../environments/environment';
import { TrainingInstanceRunsRoutingModule } from './training-instance-runs-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceRunsComponentsModule.forRoot(environment.trainingAgendaConfig),
        TrainingInstanceRunsRoutingModule,
    ],
})
export class TrainingInstanceRunsModule {}
