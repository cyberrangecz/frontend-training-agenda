import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  KypoTrainingsVisualizationOverviewLibModule,
  VisualizationOverviewConfig,
} from '@muni-kypo-crp/overview-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingRunResultsMaterialModule } from './training-run-results-material.module';
import { TrainingRunResultsComponent } from './training-run-results.component';
import { ReferenceGraphModule } from '@muni-kypo-crp/command-visualizations/reference-graph';
import { TimelineModule } from '@muni-kypo-crp/command-visualizations/timeline';
import { MistakeModule } from '@muni-kypo-crp/command-visualizations/mistake';
import { TraineeGraphModule } from '@muni-kypo-crp/command-visualizations/trainee-graph';
import { MitreTechniquesOverviewService } from '../service/mitre-techniques.service';
import { MitreTechniquesOverviewConcreteService } from '../service/mitre-techniques-concrete.service';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { TrainingRunResultsRoutingModule } from './training-run-results-routing.module';
import { CommandAnalysisWrapperComponent } from './command-analysis-wrapper/command-analysis-wrapper.component';
import { CommandTimelineWrapperComponent } from './command-timeline-wrapper/command-timeline-wrapper.component';
import { ReferenceGraphWrapperComponent } from './reference-graph-wrapper/reference-wrapper.component';
import { ScoreDevelopmentWrapperComponent } from './score-development-wrapper/score-development-wrapper.component';
import { TraineeGraphWrapperComponent } from './trainee-graph-wrapper/trainee-graph-wrapper.component';

/**
 * Module containing components for trainees results in training
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsMaterialModule,
    KypoTrainingsVisualizationOverviewLibModule,
    ReferenceGraphModule,
    TimelineModule,
    MistakeModule,
    TraineeGraphModule,
    TrainingRunResultsRoutingModule,
  ],
  declarations: [
    TrainingRunResultsComponent,
    TraineeGraphWrapperComponent,
    ScoreDevelopmentWrapperComponent,
    ReferenceGraphWrapperComponent,
    CommandTimelineWrapperComponent,
    CommandAnalysisWrapperComponent,
  ],
  providers: [{ provide: MitreTechniquesOverviewService, useClass: MitreTechniquesOverviewConcreteService }],
})
export class TrainingRunResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunResultsComponentsModule> {
    const visualizationConfig: VisualizationOverviewConfig = {
      trainingServiceUrl: config.visualizationConfig.trainingBasePath,
      elasticSearchServiceUrl: config.visualizationConfig.elasticSearchBasePath,
    };
    return {
      ngModule: TrainingRunResultsComponentsModule,
      providers: [
        ReferenceGraphModule.forRoot(config.visualizationConfig).providers,
        TimelineModule.forRoot(config.visualizationConfig).providers,
        MistakeModule.forRoot(config.visualizationConfig).providers,
        TraineeGraphModule.forRoot(config.visualizationConfig).providers,
        {
          provide: VisualizationOverviewConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
