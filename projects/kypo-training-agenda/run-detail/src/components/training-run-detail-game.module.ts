import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { Kypo2TopologyGraphConfig } from 'kypo2-topology-graph';
import { TrainingAgendaConfig } from '@kypo/training-agenda';
import { TrainingRunLevelsDeactivateGuard } from '../services/can-deactivate/training-run-levels-can-deactivate.service';
import { LevelModule } from './level/level.module';
import { TrainingRunDetailComponentsModule } from './training-run-detail-components.module';

/**
 * Module containing imports and providers for training run detail
 */
@NgModule({
  imports: [CommonModule, LevelModule, SentinelStepperModule, TrainingRunDetailComponentsModule],
  declarations: [],
  providers: [TrainingRunLevelsDeactivateGuard],
})
export class TrainingRunDetailGameModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunDetailGameModule> {
    return {
      ngModule: TrainingRunDetailGameModule,
      providers: [
        { provide: Kypo2TopologyGraphConfig, useValue: config.kypo2TopologyConfig },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
