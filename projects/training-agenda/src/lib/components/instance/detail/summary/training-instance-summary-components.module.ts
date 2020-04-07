import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {KypoPipesModule} from 'kypo-common';
import {ActiveTrainingRunOverviewComponent} from './active-training-run-overview/active-training-run-overview.component';
import {ArchivedTrainingRunOverviewComponent} from './archived-training-run-overview/archived-training-run-overview.component';
import {TrainingInstanceSummaryMaterialModule} from './training-instance-summary-material.module';
import {TrainingInstanceSummaryComponent} from './training-instance-summary.component';
import {Kypo2TableModule} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../services/training-run/archived/archived-training-run.service';
import {ArchivedTrainingRunConcreteService} from '../../../../services/training-run/archived/archived-training-run-concrete.service';
import {ActiveTrainingRunConcreteService} from '../../../../services/training-run/active/active-training-run-concrete.service';
import {ActiveTrainingRunService} from '../../../../services/training-run/active/active-training-run.service';
import {TrainingInstanceSummaryService} from '../../../../services/training-instance/summary/training-instance-summary.service';
import {KypoControlsModule} from 'kypo-controls';
import {TrainingInstanceSummaryConcreteService} from '../../../../services/training-instance/summary/training-instance-summary-concrete.service';
import {TrainingAgendaConfig} from '../../../../model/client/training-agenda-config';
import {TrainingInstanceInfoComponent} from './info/training-instance-info.component';

/**
 * Components and providers for training instance summaries.
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      KypoPipesModule,
      TrainingInstanceSummaryMaterialModule,
      Kypo2TableModule,
      KypoControlsModule
    ],
  declarations: [
  TrainingInstanceSummaryComponent,
  TrainingInstanceInfoComponent,
  ActiveTrainingRunOverviewComponent,
  ArchivedTrainingRunOverviewComponent
  ],
  providers: [
    {provide: TrainingInstanceSummaryService, useClass: TrainingInstanceSummaryConcreteService},
    {provide: ArchivedTrainingRunService, useClass: ArchivedTrainingRunConcreteService},
    {provide: ActiveTrainingRunService, useClass: ActiveTrainingRunConcreteService},
  ]
})
export class TrainingInstanceSummaryComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceSummaryComponentsModule> {
    return {
      ngModule: TrainingInstanceSummaryComponentsModule,
      providers: [
        {provide: TrainingAgendaConfig, useValue: config},
      ]
    };
  }
}
