import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HurdlingVisualizationConfig, KypoTrainingsHurdlingVizLibModule } from '@muni-kypo-crp/hurdling-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceProgressMaterialModule } from './training-instance-progress-material.module';
import { TrainingInstanceProgressComponent } from './training-instance-progress.component';
import { MatIconModule } from '@angular/material/icon';
import { TimelineModule } from '@muni-kypo-crp/command-visualizations/timeline';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * Component imports, declarations and providers for training instance progress page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressMaterialModule,
    KypoTrainingsHurdlingVizLibModule,
    MatIconModule,
    TimelineModule,
    MatTabsModule,
  ],
  declarations: [TrainingInstanceProgressComponent],
  providers: [],
})
export class TrainingInstanceProgressComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceProgressComponentsModule> {
    const visualizationConfig: HurdlingVisualizationConfig = {
      trainingServiceUrl: config.visualizationConfig.trainingBasePath,
    };
    return {
      ngModule: TrainingInstanceProgressComponentsModule,
      providers: [
        TimelineModule.forRoot(config.visualizationConfig).providers,
        {
          provide: HurdlingVisualizationConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
