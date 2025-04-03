import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoopTrainingDefaultNavigator, CoopTrainingNavigator, TrainingAgendaConfig } from '@crczp/training-agenda';
import {
    CoopTrainingInstanceResolver,
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
        { provide: CoopTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingInstanceResolver, useClass: CoopTrainingInstanceResolver },
        TrainingInstanceDetailTitleResolver,
        TrainingInstanceDetailBreadcrumbResolver,
    ],
})
export class CoopTrainingInstanceDetailComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CoopTrainingInstanceDetailComponentsModule> {
        return {
            ngModule: CoopTrainingInstanceDetailComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
