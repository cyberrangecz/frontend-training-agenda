import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoopTrainingDefaultNavigator, TrainingAgendaConfig, TrainingNavigator } from '@crczp/training-agenda';
import { CommonTrainingDefinitionOverviewComponentsModule } from './common-training-definition-overview.module';
import { TrainingTypeEnum } from '@crczp/training-model';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    CoopTrainingDefinitionResolver,
    CoopTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [CommonTrainingDefinitionOverviewComponentsModule.forRoot(TrainingTypeEnum.COOP)],
})
export class CoopTrainingDefinitionOverviewComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CoopTrainingDefinitionOverviewComponentsModule> {
        return {
            ngModule: CoopTrainingDefinitionOverviewComponentsModule,
            providers: [
                { provide: CommonTrainingDefinitionResolver, useClass: CoopTrainingDefinitionResolver },
                { provide: CommonTrainingDefinitionTitleResolver, useClass: CoopTrainingDefinitionTitleResolver },
                { provide: TrainingNavigator, useClass: CoopTrainingDefaultNavigator },
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
