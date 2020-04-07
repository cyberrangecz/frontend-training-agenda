import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionEditOverviewComponent} from './training-definition-edit-overview.component';
import {TrainingDefinitionCanDeactivate} from '../../../services/can-deactivate/training-definition-can-deactivate.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionEditOverviewComponent,
    resolve: {
      trainingDefinition: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver
    },
    canDeactivate: [TrainingDefinitionCanDeactivate],
  },
];

/**
 * Routing for training definition edit overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingDefinitionEditOverviewRoutingModule {

}
