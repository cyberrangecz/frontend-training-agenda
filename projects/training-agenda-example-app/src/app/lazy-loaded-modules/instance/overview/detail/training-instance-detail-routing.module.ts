import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '../../../../../../../kypo-training-agenda/src/lib/model/client/activated-route-data-attributes';
import {
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH,
  RESULTS_PATH,
  SUMMARY_PATH,
} from '../../../../../../../kypo-training-agenda/src/lib/model/client/default-paths';
import { TrainingInstanceDetailBreadcrumbResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/instance/training-instance-detail-breadcrumb-resolver.service';
import { TrainingInstanceDetailTitleResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/instance/training-instance-detail-title-resolver.service';
import { TrainingInstanceResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/instance/training-instance-resolver.service';
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
];

/**
 * Routing module for training instance detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceDetailRoutingModule {}
