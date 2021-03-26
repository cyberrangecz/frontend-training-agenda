import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceSummaryConcreteService } from '../services/state/summary/adaptive-instance-summary-concrete.service';
import { AdaptiveInstanceSummaryService } from '../services/state/summary/adaptive-instance-summary.service';
import { ActiveAdaptiveRunConcreteService } from '../services/state/active-runs/active-adaptive-run-concrete.service';
import { ActiveAdaptiveRunService } from '../services/state/active-runs/active-adaptive-run.service';
import { ArchivedAdaptiveRunConcreteService } from '../services/state/archived-runs/archived-adaptive-run-concrete.service';
import { ArchivedAdaptiveRunService } from '../services/state/archived-runs/archived-adaptive-run.service';
import { ActiveAdaptiveRunOverviewComponent } from './active-adaptive-run-overview/active-adaptive-run-overview.component';
import { ArchivedAdaptiveRunOverviewComponent } from './archived-adaptive-run-overview/archived-adaptive-run-overview.component';
import { AdaptiveInstanceInfoComponent } from './info/adaptive-instance-info.component';
import { AdaptiveInstanceSummaryMaterialModule } from './adaptive-instance-summary-material.module';
import { AdaptiveInstanceSummaryComponent } from './adaptive-instance-summary.component';

/**
 * Components and providers for training instance summaries.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SentinelPipesModule,
    RouterModule,
    AdaptiveInstanceSummaryMaterialModule,
    SentinelTableModule,
    SentinelControlsModule,
  ],
  declarations: [
    AdaptiveInstanceSummaryComponent,
    AdaptiveInstanceInfoComponent,
    ActiveAdaptiveRunOverviewComponent,
    ArchivedAdaptiveRunOverviewComponent,
  ],
  providers: [
    { provide: AdaptiveInstanceSummaryService, useClass: AdaptiveInstanceSummaryConcreteService },
    { provide: ArchivedAdaptiveRunService, useClass: ArchivedAdaptiveRunConcreteService },
    { provide: ActiveAdaptiveRunService, useClass: ActiveAdaptiveRunConcreteService },
  ],
})
export class AdaptiveInstanceSummaryComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceSummaryComponentsModule> {
    return {
      ngModule: AdaptiveInstanceSummaryComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
