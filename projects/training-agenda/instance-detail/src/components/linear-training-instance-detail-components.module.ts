import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import {
    LinearTrainingInstanceResolver,
    TrainingInstanceDetailBreadcrumbResolver,
    TrainingInstanceDetailTitleResolver,
    TrainingInstanceResolver,
} from '@crczp/training-agenda/resolvers';

/**
 * Module containing components and providers for training instance detail agenda
 */
@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [
        { provide: TrainingInstanceResolver, useClass: LinearTrainingInstanceResolver },
        TrainingInstanceDetailTitleResolver,
        TrainingInstanceDetailBreadcrumbResolver,
    ],
})
export class LinearTrainingInstanceDetailComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<LinearTrainingInstanceDetailComponentsModule> {
        return {
            ngModule: LinearTrainingInstanceDetailComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
