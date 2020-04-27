import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingRunDetailComponent } from '../../../../../../../kypo-training-agenda/src/lib/components/run/detail/training-run-detail.component';
import { TrainingRunLevelsDeactivateGuard } from '../../../../../../../kypo-training-agenda/src/lib/services/can-deactivate/training-run-levels-can-deactivate.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunDetailComponent,
    canDeactivate: [TrainingRunLevelsDeactivateGuard],
  },
];

/**
 * Routing for training run detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRunDetailRoutingModule {}
