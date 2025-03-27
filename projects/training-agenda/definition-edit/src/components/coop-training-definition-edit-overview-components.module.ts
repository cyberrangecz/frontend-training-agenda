import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingTypeEnum } from '@crczp/training-model';
import { CommonTrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    CoopTrainingDefinitionResolver,
    CoopTrainingDefinitionTitleResolver,
    TrainingDefinitionBreadcrumbResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
    imports: [CommonTrainingDefinitionEditOverviewComponentsModule.forRoot(TrainingTypeEnum.COOP)],
})
export class CoopTrainingDefinitionEditOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<CoopTrainingDefinitionEditOverviewComponentsModule> {
        return {
            ngModule: CoopTrainingDefinitionEditOverviewComponentsModule,
            providers: [
                { provide: CommonTrainingDefinitionResolver, useClass: CoopTrainingDefinitionResolver },
                { provide: CommonTrainingDefinitionTitleResolver, useClass: CoopTrainingDefinitionTitleResolver },
                TrainingDefinitionBreadcrumbResolver,
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
