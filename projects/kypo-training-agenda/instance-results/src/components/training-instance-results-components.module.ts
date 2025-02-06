import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AssessmentVisualizationConfig,
  KypoAssessmentsResultsVisualizationModule,
} from '@cyberrangecz-platform/assessment-visualization';
import { HurdlingVisualizationConfig, KypoTrainingsHurdlingVizLibModule } from '@cyberrangecz-platform/hurdling-visualization';
import {
  KypoTrainingsVisualizationOverviewLibModule,
  VisualizationOverviewConfig,
} from '@cyberrangecz-platform/overview-visualization';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import { TrainingInstanceResultsMaterialModule } from './training-instance-results-material.module';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';
import { DashboardModule } from '@cyberrangecz-platform/visualization-dashboard/dashboard';
import { TimelineModule } from '@cyberrangecz-platform/command-visualizations/timeline';
import { MistakeModule } from '@cyberrangecz-platform/command-visualizations/mistake';
import { TrainingInstanceResultsRoutingModule } from './training-instance-results-routing.module';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { CommandTimelineWrapperComponent } from './command-timeline-wrapper/command-timeline-wrapper.component';
import { AssessmentWrapperComponent } from './assessment-wrapper/assessment-wrapper.component';
import { CommandAnalysisWrapperComponent } from './command-analysis-wrapper/command-analysis-wrapper.component';
import { AggregatedDashboardWrapperComponent } from './aggregated-dashboard-wrapper/aggregated-dashboard-wrapper.component';
import { StatisticalVisualizationModule } from '@cyberrangecz-platform/statistical-visualizations/statistical-viz';
import { WalkthroughWrapperComponent } from './walkthrough-wrapper/walkthrough-wrapper.component';
import { KypoWalkthroughVisualizationModule } from '@cyberrangecz-platform/walkthrough-visualization';
import { WalkthroughService } from './walkthrough-wrapper/services/walkthrough.service';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsMaterialModule,
    KypoTrainingsHurdlingVizLibModule,
    KypoAssessmentsResultsVisualizationModule,
    KypoTrainingsVisualizationOverviewLibModule,
    StatisticalVisualizationModule,
    DashboardModule,
    TimelineModule,
    MistakeModule,
    KypoWalkthroughVisualizationModule,
    TrainingInstanceResultsRoutingModule,
  ],
  declarations: [
    TrainingInstanceResultsComponent,
    AssessmentWrapperComponent,
    CommandTimelineWrapperComponent,
    DashboardWrapperComponent,
    CommandAnalysisWrapperComponent,
    AggregatedDashboardWrapperComponent,
    WalkthroughWrapperComponent,
  ],
  providers: [WalkthroughService],
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
        KypoWalkthroughVisualizationModule.forRoot(visualizationConfig).providers,
        TimelineModule.forRoot(config.visualizationConfig).providers,
        MistakeModule.forRoot(config.visualizationConfig).providers,
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
