import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import {
  TrainingAgendaContext,
  RunningTrainingRunConcreteService,
  RunningTrainingRunService,
} from '@muni-kypo-crp/training-agenda/internal';
import { AccessTrainingRunResolver, TrainingRunResultsResolver } from '@muni-kypo-crp/training-agenda/resolvers';
import { AccessedTrainingRunConcreteService } from '../services/state/accessed-training-run-concrete.service';
import { AccessedTrainingRunService } from '../services/state/accessed-training-run.service';
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
