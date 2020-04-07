import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceResultsComponent} from '../../../../../../../training-agenda/src/lib/components/instance/detail/results/training-instance-results.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceResultsComponent,
  }
];

/**
 * Routing module for training instance results
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInstanceResultsRoutingModule {

}
