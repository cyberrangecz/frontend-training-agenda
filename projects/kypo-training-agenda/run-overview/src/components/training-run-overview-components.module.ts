import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { PaginationService, TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import {
  RunningAdaptiveRunService,
  RunningAdaptiveRunConcreteService,
} from '@muni-kypo-crp/training-agenda/adaptive-run-detail';
import {
  AccessTrainingRunResolver,
  AccessAdaptiveRunResolver,
  TrainingRunResultsResolver,
  AdaptiveRunResultsResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { AccessedTrainingRunConcreteService } from '../services/state/training/accessed-training-run-concrete.service';
import { AccessedTrainingRunService } from '../services/state/training/accessed-training-run.service';
import { AccessTrainingRunComponent } from './access/access-training-run.component';
import { TrainingRunOverviewMaterialModule } from './training-run-overview-material.module';
import { TrainingRunOverviewComponent } from './training-run-overview.component';
import { AccessedAdaptiveRunService } from '../services/state/adaptive/accessed-adaptive-run.service';
import { AccessedAdaptiveRunConcreteService } from '../services/state/adaptive/accessed-adaptive-run-concrete.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingDialogModule } from '@muni-kypo-crp/training-agenda/internal';
import { TopologyApiModule } from '@muni-kypo-crp/topology-graph';
import {
  RunningTrainingRunConcreteService,
  RunningTrainingRunService,
} from '@muni-kypo-crp/training-agenda/run-detail';

/**
 * Main module for trainee agenda. Contains components and top level routing
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainingRunOverviewMaterialModule,
    SentinelPipesModule,
    ReactiveFormsModule,
    MatCardModule,
    SentinelTableModule,
    MatProgressBarModule,
    MatDialogModule,
    LoadingDialogModule,
    TopologyApiModule,
  ],
  declarations: [TrainingRunOverviewComponent, AccessTrainingRunComponent],
  providers: [
    AccessTrainingRunResolver,
    AccessAdaptiveRunResolver,
    TrainingRunResultsResolver,
    AdaptiveRunResultsResolver,
    TrainingAgendaContext,
    PaginationService,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: RunningTrainingRunService, useClass: RunningTrainingRunConcreteService },
    { provide: RunningAdaptiveRunService, useClass: RunningAdaptiveRunConcreteService },
    { provide: AccessedTrainingRunService, useClass: AccessedTrainingRunConcreteService },
    { provide: AccessedAdaptiveRunService, useClass: AccessedAdaptiveRunConcreteService },
  ],
})
export class TrainingRunOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunOverviewComponentsModule> {
    return {
      ngModule: TrainingRunOverviewComponentsModule,
      providers: [
        { provide: TrainingAgendaConfig, useValue: config },
        TopologyApiModule.forRoot(config.kypo2TopologyConfig).providers,
      ],
    };
  }
}
