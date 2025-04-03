import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopTrainingInstanceEditOverviewComponent } from '../../../../../../../training-agenda/instance-edit/src/components/coop-training-instance-edit-overview/coop-training-instance-edit-overview.component';
import { TrainingInstanceCanDeactivate } from '../../../../../../../training-agenda/instance-edit/src/services/can-deactivate/training-instance-can-deactivate.service';

const routes: Routes = [
    {
        path: '',
        component: CoopTrainingInstanceEditOverviewComponent,
        canDeactivate: [TrainingInstanceCanDeactivate<CoopTrainingInstanceEditOverviewComponent>],
    },
];

/**
 * Routing module for training instance edit module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoopTrainingInstanceEditOverviewRoutingModule {}
