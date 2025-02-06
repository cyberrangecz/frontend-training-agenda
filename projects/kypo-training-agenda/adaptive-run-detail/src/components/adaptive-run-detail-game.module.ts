import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { KypoTopologyGraphConfig } from '@cyberrangecz-platform/topology-graph';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
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
        { provide: KypoTopologyGraphConfig, useValue: config.kypoTopologyConfig },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
