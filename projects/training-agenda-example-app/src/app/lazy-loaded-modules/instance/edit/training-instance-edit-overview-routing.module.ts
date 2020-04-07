import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceEditOverviewComponent} from '../../../../../../training-agenda/src/lib/components/instance/edit/training-instance-edit-overview.component';
import {TrainingInstanceCanDeactivate} from '../../../../../../training-agenda/src/lib/services/can-deactivate/training-instance-can-deactivate.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceEditOverviewComponent,
    canDeactivate: [TrainingInstanceCanDeactivate],
  },
];

/**
 * Routing module for training instance edit module
 */
@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TrainingInstanceEditOverviewRoutingModule {
}
