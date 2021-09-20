import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME,
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH,
  RESULTS_PATH,
  SUMMARY_PATH,
  RUNS_PATH,
} from '@muni-kypo-crp/training-agenda';
import {
  TrainingInstanceDetailBreadcrumbResolver,
  TrainingInstanceDetailTitleResolver,
  TrainingInstanceResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: SUMMARY_PATH,
  },
  {
    path: SUMMARY_PATH,
    resolve: {
      [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
      title: TrainingInstanceDetailTitleResolver,
    },
    loadChildren: () =>
      import('./summary/training-instance-summary.module').then((m) => m.TrainingInstanceSummaryModule),
  },
  {
    path: PROGRESS_PATH,
    resolve: {
      [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
      title: TrainingInstanceDetailTitleResolver,
    },
    loadChildren: () =>
      import('./progress/training-instance-progress.module').then((m) => m.TrainingInstanceProgressModule),
  },
  {
    path: RESULTS_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
      title: TrainingInstanceDetailTitleResolver,
    },
    loadChildren: () =>
      import('./results/training-instance-results.module').then((m) => m.TrainingInstanceResultsModule),
  },
  {
    path: ACCESS_TOKEN_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
      title: TrainingInstanceDetailTitleResolver,
    },
    loadChildren: () => import('./token/access-token-detail.module').then((m) => m.AccessTokenDetailModule),
  },
  {
    path: RUNS_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
      title: TrainingInstanceDetailTitleResolver,
    },
    loadChildren: () => import('./runs/training-instance-runs.module').then((m) => m.TrainingInstanceRunsModule),
  },
];

/**
 * Routing module for training instance detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceDetailRoutingModule {}
