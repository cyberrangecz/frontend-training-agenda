import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TrainingRunOverviewMaterialModule} from './training-run-overview-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KypoPipesModule} from 'kypo-common';
import {RunningTrainingRunConcreteService} from '../../../services/training-run/running/running-training-run-concrete.service';
import {AccessTrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {MatCardModule} from '@angular/material/card';
import {Kypo2TableModule} from 'kypo2-table';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';
import {AccessedTrainingRunConcreteService} from '../../../services/training-run/accessed/accessed-training-run-concrete.service';
import {TrainingRunResultsResolver} from '../../../services/resolvers/training-run-results-resolver.service';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {TrainingAgendaConfig} from '../../../model/client/training-agenda-config';
import {AccessTrainingRunComponent} from './access/access-training-run.component';

/**
 * Main module for trainee agenda. Contains components and top level routing
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainingRunOverviewMaterialModule,
    KypoPipesModule,
    ReactiveFormsModule,
    MatCardModule,
    Kypo2TableModule,
  ],
  declarations: [
    TrainingRunOverviewComponent,
    AccessTrainingRunComponent
  ],
  providers: [
    AccessTrainingRunResolver,
    TrainingRunResultsResolver,
    {provide: RunningTrainingRunService, useClass: RunningTrainingRunConcreteService},
    {provide: AccessedTrainingRunService, useClass: AccessedTrainingRunConcreteService},
  ]
})

export class TrainingRunOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingRunOverviewComponentsModule> {
    return {
      ngModule: TrainingRunOverviewComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
