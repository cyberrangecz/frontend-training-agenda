import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HurdlingVisualizationConfig, Kypo2TrainingsHurdlingVizLibModule } from '@muni-kypo-crp/hurdling-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceProgressMaterialModule } from './training-instance-progress-material.module';
import { TrainingInstanceProgressComponent } from './training-instance-progress.component';

/**
 * Component imports, declarations and providers for training instance progress page
 */
@NgModule({
  imports: [CommonModule, TrainingInstanceProgressMaterialModule, Kypo2TrainingsHurdlingVizLibModule],
  declarations: [TrainingInstanceProgressComponent],
  providers: [],
})
export class TrainingInstanceProgressComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceProgressComponentsModule> {
    const visualizationConfig: HurdlingVisualizationConfig = {
      trainingServiceUrl: config.visualizationConfig.trainingBasePath,
      elasticSearchServiceUrl: config.visualizationConfig.elasticSearchBasePath,
    };
    return {
      ngModule: TrainingInstanceProgressComponentsModule,
      providers: [
        {
          provide: HurdlingVisualizationConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
