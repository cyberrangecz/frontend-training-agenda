import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDefinitionOverviewComponent } from '@cyberrangecz-platform/training-agenda/definition-overview';
import {
  TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME,
  TRAINING_DEFINITION_DETAIL_PATH,
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH,
  TRAINING_DEFINITION_SELECTOR,
} from '@cyberrangecz-platform/training-agenda';
import {
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
  TrainingDefinitionTitleResolver,
} from '@cyberrangecz-platform/training-agenda/resolvers';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionOverviewComponent,
  },
  {
    path: TRAINING_DEFINITION_NEW_PATH,
    loadChildren: () =>
      import('./edit/training-definition-edit-overview.module').then((m) => m.TrainingDefinitionEditOverviewModule),
  },
  {
    path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_EDIT_PATH}`,
    loadChildren: () =>
      import('./edit/training-definition-edit-overview.module').then((m) => m.TrainingDefinitionEditOverviewModule),
  },
  {
    path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_PREVIEW_PATH}`,
    loadChildren: () => import('./preview/training-preview.module').then((m) => m.TrainingPreviewModule),
  },
  {
    path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_DETAIL_PATH}`,
    loadChildren: () =>
      import('./detail/training-definition-detail.module').then((m) => m.TrainingDefinitionDetailModule),
    resolve: {
      [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver,
      title: TrainingDefinitionTitleResolver,
    },
  },
];

/**
 * Routing module training definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDefinitionOverviewRoutingModule {}
