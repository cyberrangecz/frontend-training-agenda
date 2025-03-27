import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingTypeEnum } from '@crczp/training-model';
import { CommonTrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
    TrainingDefinitionBreadcrumbResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
    imports: [CommonTrainingDefinitionEditOverviewComponentsModule.forRoot(TrainingTypeEnum.LINEAR)],
})
export class LinearTrainingDefinitionEditOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<LinearTrainingDefinitionEditOverviewComponentsModule> {
        return {
            ngModule: LinearTrainingDefinitionEditOverviewComponentsModule,
            providers: [
                { provide: CommonTrainingDefinitionResolver, useClass: LinearTrainingDefinitionResolver },
                { provide: CommonTrainingDefinitionTitleResolver, useClass: LinearTrainingDefinitionTitleResolver },
                TrainingDefinitionBreadcrumbResolver,
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
