import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME,
  TrainingDefinitionBreadcrumbResolver,
  TrainingDefinitionResolver,
  TrainingPreviewComponent
} from 'training-agenda';

const routes: Routes = [
  {
    path: '',
    component: TrainingPreviewComponent,
    resolve: {
      [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver
    }
  }
];

/**
 * Routing for training definition preview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingPreviewRoutingModule {

}
