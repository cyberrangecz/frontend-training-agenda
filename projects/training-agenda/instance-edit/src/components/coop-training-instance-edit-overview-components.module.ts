import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingInstanceCanDeactivate } from '../services/can-deactivate/training-instance-can-deactivate.service';
import { CommonTrainingInstanceEditOverviewComponentsModule } from './common-instance-edit-overview-components.module';
import { CoopTrainingInstanceEditOverviewComponent } from './coop-training-instance-edit-overview/coop-training-instance-edit-overview.component';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [CommonTrainingInstanceEditOverviewComponentsModule],
    declarations: [CoopTrainingInstanceEditOverviewComponent],
    exports: [CoopTrainingInstanceEditOverviewComponent],
    providers: [TrainingInstanceCanDeactivate],
})
export class CoopTrainingInstanceEditOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<CoopTrainingInstanceEditOverviewComponentsModule> {
        return {
            ngModule: CoopTrainingInstanceEditOverviewComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
