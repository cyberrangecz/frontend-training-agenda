import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import {
    CommonTrainingDefinitionResolver,
    CoopTrainingDefinitionResolver,
    TrainingDefinitionDetailBreadcrumbResolver,
    TrainingDefinitionDetailTitleResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers for training definition detail agenda
 */
@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [
        { provide: CommonTrainingDefinitionResolver, useClass: CoopTrainingDefinitionResolver },
        TrainingDefinitionDetailTitleResolver,
        TrainingDefinitionDetailBreadcrumbResolver,
    ],
})
export class CoopDefinitionDetailComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CoopDefinitionDetailComponentsModule> {
        return {
            ngModule: CoopDefinitionDetailComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
