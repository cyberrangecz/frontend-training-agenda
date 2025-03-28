import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME,
    TRAINING_INSTANCE_DETAIL_PATH,
    TRAINING_INSTANCE_EDIT_PATH,
    TRAINING_INSTANCE_NEW_PATH,
    TRAINING_INSTANCE_SELECTOR,
} from '@crczp/training-agenda';
import {
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopTrainingInstanceOverviewComponent } from '../../../../../../training-agenda/instance-overview/src/components/coop-training-instance-overview/linear-training-instance-overview.component';

const routes: Routes = [
    {
        path: '',
        component: CoopTrainingInstanceOverviewComponent,
    },
    {
        path: `:${TRAINING_INSTANCE_SELECTOR}/${TRAINING_INSTANCE_DETAIL_PATH}`,
        loadChildren: () =>
            import('./detail/training-instance-detail.module').then((m) => m.TrainingInstanceDetailModule),
        resolve: {
            [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
            breadcrumb: TrainingInstanceBreadcrumbResolver,
            title: TrainingInstanceTitleResolver,
        },
    },
    {
        path: TRAINING_INSTANCE_NEW_PATH,
        loadChildren: () =>
            import('./edit/coop-training-instance-edit-overview.module').then(
                (m) => m.CoopTrainingInstanceEditOverviewModule,
            ),
        resolve: {
            [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
            breadcrumb: TrainingInstanceBreadcrumbResolver,
            title: TrainingInstanceTitleResolver,
        },
    },
    {
        path: `:${TRAINING_INSTANCE_SELECTOR}/${TRAINING_INSTANCE_EDIT_PATH}`,
        loadChildren: () =>
            import('./edit/coop-training-instance-edit-overview.module').then(
                (m) => m.CoopTrainingInstanceEditOverviewModule,
            ),
        resolve: {
            [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
            breadcrumb: TrainingInstanceBreadcrumbResolver,
            title: TrainingInstanceTitleResolver,
        },
    },
];

/**
 * Routing for training instance module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoopTrainingInstanceOverviewRoutingModule {}
