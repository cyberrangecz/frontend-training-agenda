import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KypoPipesModule } from 'kypo-common';
import { KypoControlsModule } from 'kypo-controls';
import { Kypo2TableModule } from 'kypo2-table';
import { TrainingAgendaConfig } from '../../../../model/client/training-agenda-config';
import { TrainingInstanceSummaryConcreteService } from '../../../../services/training-instance/summary/training-instance-summary-concrete.service';
import { TrainingInstanceSummaryService } from '../../../../services/training-instance/summary/training-instance-summary.service';
import { ActiveTrainingRunConcreteService } from '../../../../services/training-run/active/active-training-run-concrete.service';
import { ActiveTrainingRunService } from '../../../../services/training-run/active/active-training-run.service';
import { ArchivedTrainingRunConcreteService } from '../../../../services/training-run/archived/archived-training-run-concrete.service';
import { ArchivedTrainingRunService } from '../../../../services/training-run/archived/archived-training-run.service';
import { ActiveTrainingRunOverviewComponent } from './active-training-run-overview/active-training-run-overview.component';
import { ArchivedTrainingRunOverviewComponent } from './archived-training-run-overview/archived-training-run-overview.component';
import { TrainingInstanceInfoComponent } from './info/training-instance-info.component';
import { TrainingInstanceSummaryMaterialModule } from './training-instance-summary-material.module';
import { TrainingInstanceSummaryComponent } from './training-instance-summary.component';

/**
 * Components and providers for training instance summaries.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    KypoPipesModule,
    RouterModule,
    TrainingInstanceSummaryMaterialModule,
    Kypo2TableModule,
    KypoControlsModule,
  ],
  declarations: [
    TrainingInstanceSummaryComponent,
    TrainingInstanceInfoComponent,
    ActiveTrainingRunOverviewComponent,
    ArchivedTrainingRunOverviewComponent,
  ],
  providers: [
    { provide: TrainingInstanceSummaryService, useClass: TrainingInstanceSummaryConcreteService },
    { provide: ArchivedTrainingRunService, useClass: ArchivedTrainingRunConcreteService },
    { provide: ActiveTrainingRunService, useClass: ActiveTrainingRunConcreteService },
  ],
})
export class TrainingInstanceSummaryComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceSummaryComponentsModule> {
    return {
      ngModule: TrainingInstanceSummaryComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
