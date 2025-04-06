import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { CoopTrainingInstanceSummaryComponent } from './coop-summary-component/coop-training-instance-summary.component';
import { MatCard } from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CommonTrainingInstanceSummaryComponentsModule } from './common-training-instance-summary-components.module';

/**
 * Components and providers for training instance summaries.
 */
@NgModule({
    imports: [CommonModule, CommonTrainingInstanceSummaryComponentsModule, MatCard, AsyncPipe],
    declarations: [CoopTrainingInstanceSummaryComponent],
})
export class CoopTrainingInstanceSummaryComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CoopTrainingInstanceSummaryComponentsModule> {
        return {
            ngModule: CoopTrainingInstanceSummaryComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
