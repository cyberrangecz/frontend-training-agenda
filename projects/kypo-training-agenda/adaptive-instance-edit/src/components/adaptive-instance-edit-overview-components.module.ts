import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelListModule } from '@sentinel/components/list';
import { SentinelUserAssignModule } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { PoolAssignComponent } from './pool-assign/pool-assign.component';
import { AdaptiveDefinitionSelectComponent } from './adaptive-definition-select/adaptive-definition-select.component';
import { AdaptiveInstanceEditComponent } from './adaptive-instance-edit/adaptive-instance-edit.component';
import { AdaptiveInstanceEditOverviewMaterialModule } from './adaptive-instance-edit-overview-material.module';
import { AdaptiveInstanceEditOverviewComponent } from './adaptive-instance-edit-overview.component';
import { AdaptiveInstanceCanDeactivate } from '../services/can-deactivate/adaptive-instance-can-deactivate.service';
import { SandboxDefinitionAssignComponent } from './sandbox-definition-assign/sandbox-definition-assign.component';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SentinelUserAssignModule,
    RouterModule,
    SentinelListModule,
    SentinelPipesModule,
    AdaptiveInstanceEditOverviewMaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SentinelControlsModule,
  ],
  declarations: [
    AdaptiveInstanceEditOverviewComponent,
    AdaptiveInstanceEditComponent,
    AdaptiveDefinitionSelectComponent,
    PoolAssignComponent,
    SandboxDefinitionAssignComponent,
  ],
  providers: [AdaptiveInstanceCanDeactivate],
})
export class AdaptiveInstanceEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceEditOverviewComponentsModule> {
    return {
      ngModule: AdaptiveInstanceEditOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
