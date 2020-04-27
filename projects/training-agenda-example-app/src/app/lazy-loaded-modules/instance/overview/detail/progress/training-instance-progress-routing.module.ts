import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInstanceProgressComponent } from '../../../../../../../../kypo-training-agenda/src/lib/components/instance/detail/progress/training-instance-progress.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceProgressComponent,
  },
];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceProgressRoutingModule {}
