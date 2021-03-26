import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdaptiveDefinitionOverviewComponent } from '@muni-kypo-crp/training-agenda/adaptive-definition-overview';
import {
  TRAINING_DEFINITION_NEW_PATH,
  ADAPTIVE_DEFINITION_SELECTOR,
  TRAINING_DEFINITION_EDIT_PATH,
} from '@muni-kypo-crp/training-agenda';

const routes: Routes = [
  {
    path: '',
    component: AdaptiveDefinitionOverviewComponent,
  },
  {
    path: TRAINING_DEFINITION_NEW_PATH,
    loadChildren: () =>
      import('./edit/adaptive-definition-edit-overview.module').then((m) => m.AdaptiveDefinitionEditOverviewModule),
  },
  {
    path: `:${ADAPTIVE_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_EDIT_PATH}`,
    loadChildren: () =>
      import('./edit/adaptive-definition-edit-overview.module').then((m) => m.AdaptiveDefinitionEditOverviewModule),
  },
];

/**
 * Routing module adaptive definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptiveDefinitionOverviewRoutingModule {}
