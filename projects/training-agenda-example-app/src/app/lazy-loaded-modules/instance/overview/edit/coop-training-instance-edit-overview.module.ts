import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CoopTrainingInstanceEditOverviewComponentsModule } from '../../../../../../../training-agenda/instance-edit/src/components/coop-training-instance-edit-overview-components.module';
import { CoopTrainingInstanceEditOverviewRoutingModule } from './coop-training-instance-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingInstanceEditOverviewRoutingModule,
        CoopTrainingInstanceEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    ],
})
export class CoopTrainingInstanceEditOverviewModule {}
