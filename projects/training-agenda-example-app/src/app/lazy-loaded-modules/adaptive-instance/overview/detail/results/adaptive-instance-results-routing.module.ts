import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdaptiveInstanceResultsComponent } from '@muni-kypo-crp/training-agenda/adaptive-instance-results';

const routes: Routes = [
  {
    path: '',
    component: AdaptiveInstanceResultsComponent,
  },
];

/**
 * Routing module for training instance results
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptiveInstanceResultsRoutingModule {}
