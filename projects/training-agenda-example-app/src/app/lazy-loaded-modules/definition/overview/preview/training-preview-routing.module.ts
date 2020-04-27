import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingPreviewComponent } from '../../../../../../../kypo-training-agenda/src/lib/components/definition/preview/training-preview.component';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '../../../../../../../kypo-training-agenda/src/lib/model/client/activated-route-data-attributes';
import { TrainingDefinitionBreadcrumbResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/definition/training-definition-breadcrumb-resolver.service';
import { TrainingDefinitionResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/definition/training-definition-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingPreviewComponent,
    data: {
      title: undefined,
    },
    resolve: {
      [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver,
    },
  },
];

/**
 * Routing for training definition preview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPreviewRoutingModule {}
