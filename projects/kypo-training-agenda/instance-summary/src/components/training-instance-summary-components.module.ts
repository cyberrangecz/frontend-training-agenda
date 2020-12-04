import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceSummaryConcreteService } from '../services/state/summary/training-instance-summary-concrete.service';
import { TrainingInstanceSummaryService } from '../services/state/summary/training-instance-summary.service';
import { ActiveTrainingRunConcreteService } from '../services/state/active-runs/active-training-run-concrete.service';
import { ActiveTrainingRunService } from '../services/state/active-runs/active-training-run.service';
import { ArchivedTrainingRunConcreteService } from '../services/state/archived-runs/archived-training-run-concrete.service';
import { ArchivedTrainingRunService } from '../services/state/archived-runs/archived-training-run.service';
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
    SentinelPipesModule,
    RouterModule,
    TrainingInstanceSummaryMaterialModule,
    SentinelTableModule,
    SentinelControlsModule,
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
