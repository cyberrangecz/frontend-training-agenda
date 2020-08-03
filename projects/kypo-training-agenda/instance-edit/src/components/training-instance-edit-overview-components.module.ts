import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelListModule } from '@sentinel/components/list';
import { SentinelUserAssignModule, SentinelUserAssignService } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from 'kypo-training-agenda';
import { TrainingInstanceCanDeactivate } from '../services/can-deactivate/training-instance-can-deactivate.service';
import { TrainingInstanceEditConcreteService } from '../services/state/edit/training-instance-edit-concrete.service';
import { TrainingInstanceEditService } from '../services/state/edit/training-instance-edit.service';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';
import { PoolAssignComponent } from './pool-assign/pool-assign.component';
import { TrainingDefinitionSelectComponent } from './training-definition-select/training-definition-select.component';
import { TrainingInstanceEditOverviewMaterialModule } from './training-instance-edit-overview-material.module';
import { TrainingInstanceEditOverviewComponent } from './training-instance-edit-overview.component';
import { TrainingInstanceEditComponent } from './training-instance-edit/training-instance-edit.component';

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
    TrainingInstanceEditOverviewMaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SentinelControlsModule,
  ],
  declarations: [
    TrainingInstanceEditOverviewComponent,
    TrainingInstanceEditComponent,
    TrainingDefinitionSelectComponent,
    PoolAssignComponent,
  ],
  providers: [
    TrainingInstanceCanDeactivate,
    { provide: SentinelUserAssignService, useClass: OrganizersAssignService },
    { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService },
  ],
})
export class TrainingInstanceEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingInstanceEditOverviewComponentsModule> {
    return {
      ngModule: TrainingInstanceEditOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
