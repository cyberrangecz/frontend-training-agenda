import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  TRAINING_RUN_RESULTS_AGGREGATED_DASHBOARD_PATH,
  TRAINING_RUN_RESULTS_ASSESSMENT_PATH,
  TRAINING_RUN_RESULTS_COMMAND_ANALYSIS_PATH,
  TRAINING_RUN_RESULTS_COMMAND_TIMELINE_PATH,
  TRAINING_RUN_RESULTS_DASHBOARD_PATH,
  TRAINING_RUN_RESULTS_TRAINEE_GRAPH_PATH,
} from '@muni-kypo-crp/training-agenda';
import { AssessmentWrapperComponent } from './assessment-wrapper/assessment-wrapper.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';
import { TraineeGraphWrapperComponent } from './trainee-graph-wrapper/trainee-graph-wrapper.component';
import { CommandTimelineWrapperComponent } from './command-timeline-wrapper/command-timeline-wrapper.component';
import { CommandAnalysisWrapperComponent } from './command-analysis-wrapper/command-analysis-wrapper.component';
import { AggregatedDashboardWrapperComponent } from './aggregated-dashboard-wrapper/aggregated-dashboard-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceResultsComponent,
    children: [
      { path: '', redirectTo: TRAINING_RUN_RESULTS_DASHBOARD_PATH },
      {
        path: TRAINING_RUN_RESULTS_AGGREGATED_DASHBOARD_PATH,
        component: AggregatedDashboardWrapperComponent,
      },
      {
        path: TRAINING_RUN_RESULTS_DASHBOARD_PATH,
        component: DashboardWrapperComponent,
      },
      {
        path: TRAINING_RUN_RESULTS_ASSESSMENT_PATH,
        component: AssessmentWrapperComponent,
      },
      {
        path: TRAINING_RUN_RESULTS_TRAINEE_GRAPH_PATH,
        component: TraineeGraphWrapperComponent,
      },
      {
        path: TRAINING_RUN_RESULTS_COMMAND_TIMELINE_PATH,
        component: CommandTimelineWrapperComponent,
      },
      {
        path: TRAINING_RUN_RESULTS_COMMAND_ANALYSIS_PATH,
        component: CommandAnalysisWrapperComponent,
      },
    ],
  },
];

/**
 * Routing for training instance module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceResultsRoutingModule {}
