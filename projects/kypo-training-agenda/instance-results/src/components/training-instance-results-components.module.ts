import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AssessmentVisualizationConfig,
  KypoAssessmentsResultsVisualizationModule,
} from '@muni-kypo-crp/assessment-visualization';
import { HurdlingVisualizationConfig, KypoTrainingsHurdlingVizLibModule } from '@muni-kypo-crp/hurdling-visualization';
import {
  KypoTrainingsVisualizationOverviewLibModule,
  VisualizationOverviewConfig,
} from '@muni-kypo-crp/overview-visualization';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceResultsMaterialModule } from './training-instance-results-material.module';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';
import { DashboardModule } from '@muni-kypo-crp/visualization-dashboard/dashboard';
import { SummaryGraphModule } from '@muni-kypo-crp/command-visualizations/summary-graph';
import { TimelineModule } from '@muni-kypo-crp/command-visualizations/timeline';
import { MistakeModule } from '@muni-kypo-crp/command-visualizations/mistake';
import { TraineeGraphModule } from '@muni-kypo-crp/command-visualizations/trainee-graph';
import { TrainingInstanceResultsRoutingModule } from './training-instance-results-routing.module';
import { TraineeGraphWrapperComponent } from './trainee-graph-wrapper/trainee-graph-wrapper.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { CommandTimelineWrapperComponent } from './command-timeline-wrapper/command-timeline-wrapper.component';
import { AssessmentWrapperComponent } from './assessment-wrapper/assessment-wrapper.component';
import { CommandAnalysisWrapperComponent } from './command-analysis-wrapper/command-analysis-wrapper.component';
import { AggregatedDashboardWrapperComponent } from './aggregated-dashboard-wrapper/aggregated-dashboard-wrapper.component';
import { StatisticalVisualizationModule } from '@muni-kypo-crp/statistical-visualizations/statistical-viz';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsMaterialModule,
    KypoTrainingsHurdlingVizLibModule,
    SummaryGraphModule,
    KypoAssessmentsResultsVisualizationModule,
    KypoTrainingsVisualizationOverviewLibModule,
    StatisticalVisualizationModule,
    DashboardModule,
    TimelineModule,
    MistakeModule,
    TraineeGraphModule,
    TrainingInstanceResultsRoutingModule,
  ],
  declarations: [
    TrainingInstanceResultsComponent,
    AssessmentWrapperComponent,
    CommandTimelineWrapperComponent,
    DashboardWrapperComponent,
    TraineeGraphWrapperComponent,
    CommandAnalysisWrapperComponent,
    AggregatedDashboardWrapperComponent,
  ],
  providers: [],
})
export class TrainingInstanceResultsComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceResultsComponentsModule> {
    const visualizationConfig = {
      trainingServiceUrl: config.visualizationConfig.trainingBasePath,
    };
    return {
      ngModule: TrainingInstanceResultsComponentsModule,
      providers: [
        StatisticalVisualizationModule.forRoot(visualizationConfig).providers,
        DashboardModule.forRoot(config.visualizationConfig).providers,
        SummaryGraphModule.forRoot(config.visualizationConfig).providers,
        TimelineModule.forRoot(config.visualizationConfig).providers,
        MistakeModule.forRoot(config.visualizationConfig).providers,
        TraineeGraphModule.forRoot(config.visualizationConfig).providers,
        {
          provide: VisualizationOverviewConfig,
          useValue: visualizationConfig,
        },
        {
          provide: HurdlingVisualizationConfig,
          useValue: visualizationConfig,
        },
        {
          provide: AssessmentVisualizationConfig,
          useValue: visualizationConfig,
        },
        { provide: TrainingAgendaConfig, useValue: config },
      ],
    };
  }
}
