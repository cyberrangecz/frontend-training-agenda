import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingRunOverviewComponent} from '../../../../../../training-agenda/src/lib/components/run/overview/training-run-overview.component';
import {AccessTrainingRunResolver} from '../../../../../../training-agenda/src/lib/services/resolvers/training-run-resolver.service';
import {TrainingRunResultsResolver} from '../../../../../../training-agenda/src/lib/services/resolvers/training-run-results-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunOverviewComponent,
  },
  {
    path: `${TRAINING_RUN_ACCESS_PATH}/:${TRAINING_RUN_ACCESS_SELECTOR}`,
    loadChildren: () => import('app/components/training-run/training-run-detail/training-run-detail.module').then(m => m.TrainingRunDetailModule),
    data: {breadcrumb: 'Game'},
    resolve: { trainingRunAccessInfo: AccessTrainingRunResolver }
  },
  {
    path: `${TRAINING_RUN_RESUME_PATH}/:${TRAINING_RUN_RESUME_SELECTOR}`,
    loadChildren: () => import('app/components/training-run/training-run-detail/training-run-detail.module').then(m => m.TrainingRunDetailModule),
    data: {breadcrumb: 'Game'},
    resolve: { trainingRunAccessInfo: AccessTrainingRunResolver }

  },
  {
    path: `${TRAINING_RUN_RESULTS_PATH}/:${TRAINING_RUN_RESULTS_SELECTOR}`,
    loadChildren: () => import('app/components/training-run/training-run-results/training-run-results.module').then(m => m.TrainingRunResultsModule),
    data: {breadcrumb: 'Results'},
    resolve: { trainingRun: TrainingRunResultsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingRunOverviewRoutingModule {

}
