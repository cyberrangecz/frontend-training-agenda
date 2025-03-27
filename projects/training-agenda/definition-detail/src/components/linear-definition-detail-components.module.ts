import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import {
    TrainingDefinitionDetailBreadcrumbResolver,
    TrainingDefinitionDetailTitleResolver,
    LinearTrainingDefinitionResolver,
    CommonTrainingDefinitionResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers for training definition detail agenda
 */
@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [
        { provide: CommonTrainingDefinitionResolver, useClass: LinearTrainingDefinitionResolver },
        TrainingDefinitionDetailTitleResolver,
        TrainingDefinitionDetailBreadcrumbResolver,
    ],
})
export class LinearDefinitionDetailComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<LinearDefinitionDetailComponentsModule> {
        return {
            ngModule: LinearDefinitionDetailComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
