import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDefinitionEditOverviewComponent } from '../../../../../../../kypo-training-agenda/src/lib/components/definition/edit/training-definition-edit-overview.component';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '../../../../../../../kypo-training-agenda/src/lib/model/client/activated-route-data-attributes';
import { TrainingDefinitionCanDeactivate } from '../../../../../../../kypo-training-agenda/src/lib/services/can-deactivate/training-definition-can-deactivate.service';
import { TrainingDefinitionBreadcrumbResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/definition/training-definition-breadcrumb-resolver.service';
import { TrainingDefinitionResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/definition/training-definition-resolver.service';
import { TrainingDefinitionTitleResolver } from '../../../../../../../kypo-training-agenda/src/lib/services/resolvers/definition/training-definition-title-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionEditOverviewComponent,
    resolve: {
      [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver,
      title: TrainingDefinitionTitleResolver,
    },
    canDeactivate: [TrainingDefinitionCanDeactivate],
  },
];

/**
 * Routing for training definition edit overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDefinitionEditOverviewRoutingModule {}
