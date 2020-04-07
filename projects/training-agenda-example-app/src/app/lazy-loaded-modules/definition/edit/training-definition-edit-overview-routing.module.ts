import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionBreadcrumbResolver} from '../../../../../../training-agenda/src/lib/services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../../../../training-agenda/src/lib/services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionEditOverviewComponent} from '../../../../../../training-agenda/src/lib/components/definition/edit/training-definition-edit-overview.component';
import {TrainingDefinitionCanDeactivate} from '../../../../../../training-agenda/src/lib/services/can-deactivate/training-definition-can-deactivate.service';

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
