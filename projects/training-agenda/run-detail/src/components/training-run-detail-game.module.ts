import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { TopologyGraphConfig } from '@crczp/topology-graph';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingRunLevelsDeactivateGuard } from '../services/can-deactivate/training-run-levels-can-deactivate.service';
import { TrainingRunDetailComponentsModule } from './training-run-detail-components.module';
import { TrainingTypeEnum } from '@crczp/training-model';

/**
 * Module containing imports and providers for training run detail
 */
@NgModule({
    imports: [CommonModule, SentinelStepperModule, TrainingRunDetailComponentsModule],
    declarations: [],
    providers: [TrainingRunLevelsDeactivateGuard],
})
export class TrainingRunDetailGameModule {
    public static TRAINING_TYPE_TOKEN = new InjectionToken<TrainingTypeEnum>('TRAINING_TYPE_TOKEN');

    static forRoot(
        config: TrainingAgendaConfig,
        trainingType = TrainingTypeEnum.LINEAR,
    ): ModuleWithProviders<TrainingRunDetailGameModule> {
        return {
            ngModule: TrainingRunDetailGameModule,
            providers: [
                { provide: TopologyGraphConfig, useValue: config.topologyConfig },
                { provide: TrainingAgendaConfig, useValue: config },
                { provide: TrainingRunDetailGameModule.TRAINING_TYPE_TOKEN, useValue: trainingType },
            ],
        };
    }
}
