import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingDefinitionOverviewComponentsCommonModule } from './training-definition-overview-common.module';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [TrainingDefinitionOverviewComponentsCommonModule.forRoot('coop')],
})
export class TrainingDefinitionOverviewComponentsCoopModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionOverviewComponentsCoopModule> {
        return {
            ngModule: TrainingDefinitionOverviewComponentsCoopModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
