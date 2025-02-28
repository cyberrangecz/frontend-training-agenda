import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingPreviewComponent } from '@crczp/training-agenda/definition-preview';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@crczp/training-agenda';
import { TrainingDefinitionBreadcrumbResolver, TrainingDefinitionResolver } from '@crczp/training-agenda/resolvers';

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
