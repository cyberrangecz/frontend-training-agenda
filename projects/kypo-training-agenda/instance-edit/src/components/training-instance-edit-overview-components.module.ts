import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelListComponent } from '@sentinel/components/list';
import { SentinelUserAssignComponent } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceCanDeactivate } from '../services/can-deactivate/training-instance-can-deactivate.service';
import { PoolAssignComponent } from './pool-assign/pool-assign.component';
import { TrainingDefinitionSelectComponent } from './training-definition-select/training-definition-select.component';
import { TrainingInstanceEditOverviewMaterialModule } from './training-instance-edit-overview-material.module';
import { TrainingInstanceEditOverviewComponent } from './training-instance-edit-overview.component';
import { TrainingInstanceEditComponent } from './training-instance-edit/training-instance-edit.component';
import { SandboxDefinitionAssignComponent } from './sandbox-definition-assign/sandbox-definition-assign.component';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SentinelUserAssignComponent,
    RouterModule,
    SentinelListComponent,
    SentinelPipesModule,
    TrainingInstanceEditOverviewMaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SentinelControlsComponent,
  ],
  declarations: [
    TrainingInstanceEditOverviewComponent,
    TrainingInstanceEditComponent,
    TrainingDefinitionSelectComponent,
    PoolAssignComponent,
    SandboxDefinitionAssignComponent,
  ],
  providers: [TrainingInstanceCanDeactivate],
})
export class TrainingInstanceEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceEditOverviewComponentsModule> {
    return {
      ngModule: TrainingInstanceEditOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
