import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingInstanceSummaryConcreteService } from '../services/state/summary/training-instance-summary-concrete.service';
import { TrainingInstanceSummaryService } from '../services/state/summary/training-instance-summary.service';
import { TrainingInstanceInfoComponent } from './info/training-instance-info.component';
import { TrainingInstanceSummaryMaterialModule } from './training-instance-summary-material.module';
import { TrainingInstanceRunsComponent } from './runs/training-instance-runs.component';
import { TrainingRunConcreteService } from '../services/state/runs/training-run-concrete.service';
import { TrainingRunService } from '../services/state/runs/training-run.service';
import { TrainingRunInfoComponent } from './runs/detail/training-run-info.component';

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
        SentinelControlsComponent,
    ],
    declarations: [TrainingInstanceInfoComponent, TrainingInstanceRunsComponent, TrainingRunInfoComponent],
    exports: [TrainingInstanceInfoComponent, TrainingInstanceRunsComponent, TrainingRunInfoComponent],
    providers: [
        { provide: TrainingInstanceSummaryService, useClass: TrainingInstanceSummaryConcreteService },
        { provide: TrainingRunService, useClass: TrainingRunConcreteService },
    ],
})
export class CommonTrainingInstanceSummaryComponentsModule {}
