import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { TrainingDefaultNavigator } from '../../../services/client/training-default-navigator.service';
import { TrainingNavigator } from '../../../services/client/training-navigator.service';
import { TrainingAgendaContext } from '../../../services/internal/training-agenda-context.service';
import { AccessTrainingRunResolver } from '../../../services/resolvers/run/training-run-resolver.service';
import { TrainingRunResultsResolver } from '../../../services/resolvers/run/training-run-results-resolver.service';
import { AccessedTrainingRunConcreteService } from '../../../services/training-run/accessed/accessed-training-run-concrete.service';
import { AccessedTrainingRunService } from '../../../services/training-run/accessed/accessed-training-run.service';
import { RunningTrainingRunConcreteService } from '../../../services/training-run/running/running-training-run-concrete.service';
import { RunningTrainingRunService } from '../../../services/training-run/running/running-training-run.service';
import { AccessTrainingRunComponent } from './access/access-training-run.component';
import { TrainingRunOverviewMaterialModule } from './training-run-overview-material.module';
import { TrainingRunOverviewComponent } from './training-run-overview.component';

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
  ],
  declarations: [TrainingRunOverviewComponent, AccessTrainingRunComponent],
  providers: [
    AccessTrainingRunResolver,
    TrainingRunResultsResolver,
    TrainingAgendaContext,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: RunningTrainingRunService, useClass: RunningTrainingRunConcreteService },
    { provide: AccessedTrainingRunService, useClass: AccessedTrainingRunConcreteService },
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
