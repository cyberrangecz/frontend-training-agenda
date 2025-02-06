import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdaptiveDefinitionCanDeactivate,
  AdaptiveDefinitionEditOverviewComponent,
} from '@cyberrangecz-platform/training-agenda/adaptive-definition-edit';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@cyberrangecz-platform/training-agenda';
import {
  AdaptiveDefinitionBreadcrumbResolver,
  AdaptiveDefinitionResolver,
  AdaptiveDefinitionTitleResolver,
} from '@cyberrangecz-platform/training-agenda/resolvers';

const routes: Routes = [
  {
    path: '',
    component: AdaptiveDefinitionEditOverviewComponent,
    resolve: {
      [ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]: AdaptiveDefinitionResolver,
      breadcrumb: AdaptiveDefinitionBreadcrumbResolver,
      title: AdaptiveDefinitionTitleResolver,
    },
    canDeactivate: [AdaptiveDefinitionCanDeactivate],
  },
];

/**
 * Routing for adaptive definition edit overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptiveDefinitionEditOverviewRoutingModule {}
