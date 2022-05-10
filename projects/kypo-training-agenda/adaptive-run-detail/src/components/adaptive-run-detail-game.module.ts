import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { Kypo2TopologyGraphConfig } from '@muni-kypo-crp/topology-graph';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveRunPhasesDeactivateGuard } from '../services/can-deactivate/adaptive-run-phases-can-deactivate.service';
import { AdaptiveRunDetailComponentsModule } from './adaptive-run-detail-components.module';

/**
 * Module containing imports and providers for adaptive run detail
 */
@NgModule({
  imports: [CommonModule, SentinelStepperModule, AdaptiveRunDetailComponentsModule],
  declarations: [],
  providers: [AdaptiveRunPhasesDeactivateGuard],
})
export class AdaptiveRunDetailGameModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveRunDetailGameModule> {
    return {
      ngModule: AdaptiveRunDetailGameModule,
      providers: [
        { provide: Kypo2TopologyGraphConfig, useValue: config.kypo2TopologyConfig },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
