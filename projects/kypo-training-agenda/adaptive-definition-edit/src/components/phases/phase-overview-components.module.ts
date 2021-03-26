import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { PhaseOverviewComponent } from './overview/phase-overview.component';
import { PhaseStepperComponent } from './stepper/phase-stepper.component';
import { PhaseEditComponentsModule } from './phase/phase-edit-components.module';
import { PhaseEditService } from '../../services/state/phase/phase-edit.service';
import { PhaseEditConcreteService } from '../../services/state/phase/phase-edit-concrete.service';

/**
 * Module containing component and providers for training-training-phase definition levels' overview
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SentinelPipesModule,
    PhaseEditComponentsModule,
    ReactiveFormsModule,
    SentinelStepperModule,
    MatDividerModule,
    SentinelControlsModule,
  ],
  declarations: [PhaseStepperComponent, PhaseOverviewComponent],
  providers: [{ provide: PhaseEditService, useClass: PhaseEditConcreteService }],
  exports: [PhaseOverviewComponent],
})
export class PhaseOverviewComponentsModule {}
