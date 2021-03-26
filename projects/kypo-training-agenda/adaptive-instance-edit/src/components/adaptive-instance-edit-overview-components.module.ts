import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelListModule } from '@sentinel/components/list';
import { SentinelUserAssignModule, SentinelUserAssignService } from '@sentinel/components/user-assign';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';
import { PoolAssignComponent } from './pool-assign/pool-assign.component';
import { AdaptiveDefinitionSelectComponent } from './adaptive-definition-select/adaptive-definition-select.component';
import { AdaptiveInstanceEditComponent } from './adaptive-instance-edit/adaptive-instance-edit.component';
import { AdaptiveInstanceEditOverviewMaterialModule } from './adaptive-instance-edit-overview-material.module';
import { AdaptiveInstanceEditOverviewComponent } from './adaptive-instance-edit-overview.component';
import { AdaptiveInstanceCanDeactivate } from '../services/can-deactivate/adaptive-instance-can-deactivate.service';
import { AdaptiveInstanceEditService } from '../services/state/edit/adaptive-instance-edit.service';
import { AdaptiveInstanceEditConcreteService } from '../services/state/edit/adaptive-instance-edit-concrete.service';

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
  ],
  providers: [
    AdaptiveInstanceCanDeactivate,
    { provide: SentinelUserAssignService, useClass: OrganizersAssignService },
    { provide: AdaptiveInstanceEditService, useClass: AdaptiveInstanceEditConcreteService },
  ],
})
export class AdaptiveInstanceEditOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveInstanceEditOverviewComponentsModule> {
    return {
      ngModule: AdaptiveInstanceEditOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
