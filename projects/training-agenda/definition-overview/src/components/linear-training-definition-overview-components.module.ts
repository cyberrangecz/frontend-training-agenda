import { ModuleWithProviders, NgModule } from '@angular/core';
import { LinearTrainingDefaultNavigator, TrainingAgendaConfig, TrainingNavigator } from '@crczp/training-agenda';
import { CommonTrainingDefinitionOverviewComponentsModule } from './common-training-definition-overview.module';
import { TrainingTypeEnum } from '@crczp/training-model';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [CommonTrainingDefinitionOverviewComponentsModule.forRoot(TrainingTypeEnum.LINEAR)],
})
export class LinearTrainingDefinitionOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<LinearTrainingDefinitionOverviewComponentsModule> {
        return {
            ngModule: LinearTrainingDefinitionOverviewComponentsModule,
            providers: [
                { provide: CommonTrainingDefinitionResolver, useClass: LinearTrainingDefinitionResolver },
                { provide: CommonTrainingDefinitionTitleResolver, useClass: LinearTrainingDefinitionTitleResolver },
                { provide: TrainingNavigator, useClass: LinearTrainingDefaultNavigator },
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
