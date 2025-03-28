import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LinearTrainingInstanceEditOverviewRoutingModule } from './linear-training-instance-edit-overview-routing.module';
import { LinearTrainingInstanceEditOverviewComponentsModule } from '../../../../../../../training-agenda/instance-edit/src/components/linear-training-instance-edit-overview-components.module';

@NgModule({
    imports: [
        CommonModule,
        LinearTrainingInstanceEditOverviewRoutingModule,
        LinearTrainingInstanceEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class LinearTrainingInstanceEditOverviewModule {}
