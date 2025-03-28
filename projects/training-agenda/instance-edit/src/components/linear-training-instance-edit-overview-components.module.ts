import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingInstanceCanDeactivate } from '../services/can-deactivate/training-instance-can-deactivate.service';
import { CommonTrainingInstanceEditOverviewComponentsModule } from './common-instance-edit-overview-components.module';
import { LinearTrainingInstanceEditOverviewComponent } from './linear-training-instance-edit-overview/linear-training-instance-edit-overview.component';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [CommonTrainingInstanceEditOverviewComponentsModule],
    declarations: [LinearTrainingInstanceEditOverviewComponent],
    exports: [LinearTrainingInstanceEditOverviewComponent],
    providers: [TrainingInstanceCanDeactivate],
})
export class LinearTrainingInstanceEditOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<LinearTrainingInstanceEditOverviewComponentsModule> {
        return {
            ngModule: LinearTrainingInstanceEditOverviewComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
