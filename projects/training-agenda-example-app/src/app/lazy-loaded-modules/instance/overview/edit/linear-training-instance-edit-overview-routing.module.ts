import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInstanceCanDeactivate } from '../../../../../../../training-agenda/instance-edit/src/services/can-deactivate/training-instance-can-deactivate.service';
import { LinearTrainingInstanceEditOverviewComponent } from '../../../../../../../training-agenda/instance-edit/src/components/linear-training-instance-edit-overview/linear-training-instance-edit-overview.component';

const routes: Routes = [
    {
        path: '',
        component: LinearTrainingInstanceEditOverviewComponent,
        canDeactivate: [TrainingInstanceCanDeactivate<LinearTrainingInstanceEditOverviewComponent>],
    },
];

/**
 * Routing module for training instance edit module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LinearTrainingInstanceEditOverviewRoutingModule {}
