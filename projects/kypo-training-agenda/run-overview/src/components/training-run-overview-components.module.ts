import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import {
  TrainingAgendaContext,
  RunningAdaptiveRunService,
  RunningAdaptiveRunConcreteService,
  RunningTrainingRunConcreteService,
  RunningTrainingRunService,
} from '@muni-kypo-crp/training-agenda/internal';
import {
  AccessTrainingRunResolver,
  AccessAdaptiveRunResolver,
  TrainingRunResultsResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';
import { AccessedTrainingRunConcreteService } from '../services/state/training/accessed-training-run-concrete.service';
import { AccessedTrainingRunService } from '../services/state/training/accessed-training-run.service';
import { AccessTrainingRunComponent } from './access/access-training-run.component';
import { TrainingRunOverviewMaterialModule } from './training-run-overview-material.module';
import { TrainingRunOverviewComponent } from './training-run-overview.component';
import { AccessedAdaptiveRunService } from '../services/state/adaptive/accessed-adaptive-run.service';
import { AccessedAdaptiveRunConcreteService } from '../services/state/adaptive/accessed-adaptive-run-concrete.service';
import { AdaptiveRunTrainingPhaseService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveRunTrainingPhaseConcreteService } from '@muni-kypo-crp/training-agenda/internal';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NextPhaseDialogModule } from '@muni-kypo-crp/training-agenda/internal';

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
    NextPhaseDialogModule,
  ],
  declarations: [TrainingRunOverviewComponent, AccessTrainingRunComponent],
  providers: [
    AccessTrainingRunResolver,
    AccessAdaptiveRunResolver,
    TrainingRunResultsResolver,
    TrainingAgendaContext,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: RunningTrainingRunService, useClass: RunningTrainingRunConcreteService },
    { provide: AdaptiveRunTrainingPhaseService, useClass: AdaptiveRunTrainingPhaseConcreteService },
    { provide: RunningAdaptiveRunService, useClass: RunningAdaptiveRunConcreteService },
    { provide: AccessedTrainingRunService, useClass: AccessedTrainingRunConcreteService },
    { provide: AccessedAdaptiveRunService, useClass: AccessedAdaptiveRunConcreteService },
  ],
})
export class TrainingRunOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunOverviewComponentsModule> {
    return {
      ngModule: TrainingRunOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
