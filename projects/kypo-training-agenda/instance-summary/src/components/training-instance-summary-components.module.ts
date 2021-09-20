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
import { TrainingInstanceInfoComponent } from './info/training-instance-info.component';
import { TrainingInstanceSummaryMaterialModule } from './training-instance-summary-material.module';
import { TrainingInstanceSummaryComponent } from './training-instance-summary.component';
import { TrainingInstanceRunsComponent } from './runs/training-instance-runs.component';
import { TrainingRunConcreteService } from '../services/state/runs/training-run-concrete.service';
import { TrainingRunService } from '../services/state/runs/training-run.service';

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
  declarations: [TrainingInstanceSummaryComponent, TrainingInstanceInfoComponent, TrainingInstanceRunsComponent],
  providers: [
    { provide: TrainingInstanceSummaryService, useClass: TrainingInstanceSummaryConcreteService },
    { provide: TrainingRunService, useClass: TrainingRunConcreteService },
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
