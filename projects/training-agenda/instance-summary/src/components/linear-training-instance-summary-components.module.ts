import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { LinearTrainingInstanceSummaryComponent } from './linear-summary-component/linear-training-instance-summary.component';
import { CommonTrainingInstanceSummaryComponentsModule } from './common-training-instance-summary-components.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';

/**
 * Components and providers for training instance summaries.
 */
@NgModule({
    imports: [CommonModule, CommonTrainingInstanceSummaryComponentsModule, AsyncPipe, MatCard],
    declarations: [LinearTrainingInstanceSummaryComponent],
})
export class LinearTrainingInstanceSummaryComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<LinearTrainingInstanceSummaryComponentsModule> {
        return {
            ngModule: LinearTrainingInstanceSummaryComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
