import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionSimulatorComponent } from './adaptive-definition-simulator.component';
import { InstanceModelSimulatorModule } from '@muni-kypo-crp/adaptive-model-simulator/instance-model-simulator';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';

@NgModule({
  imports: [CommonModule, InstanceModelSimulatorModule],

  declarations: [AdaptiveDefinitionSimulatorComponent],
})
export class AdaptiveDefinitionSimulatorComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveDefinitionSimulatorComponentsModule> {
    return {
      ngModule: AdaptiveDefinitionSimulatorComponentsModule,
      providers: [InstanceModelSimulatorModule.forRoot(config.visualizationConfig).providers],
    };
  }
}
