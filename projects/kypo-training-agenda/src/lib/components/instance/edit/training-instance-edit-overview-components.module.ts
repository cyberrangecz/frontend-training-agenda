import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { KypoPipesModule } from 'kypo-common';
import { KypoControlsModule } from 'kypo-controls';
import { KypoListModule } from 'kypo-list';
import { Kypo2UserAssignModule, Kypo2UserAssignService } from 'kypo2-user-assign';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { TrainingInstanceCanDeactivate } from '../../../services/can-deactivate/training-instance-can-deactivate.service';
import { TrainingInstanceEditConcreteService } from '../../../services/training-instance/edit/training-instance-edit-concrete.service';
import { TrainingInstanceEditService } from '../../../services/training-instance/edit/training-instance-edit.service';
import { OrganizersAssignService } from '../../../services/training-instance/organizers-assign/organizers-assign.service';
import { FreeFormModule } from '../../shared/free-form.module';
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
    Kypo2UserAssignModule,
    RouterModule,
    KypoListModule,
    FreeFormModule,
    KypoPipesModule,
    TrainingInstanceEditOverviewMaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    KypoControlsModule,
  ],
  declarations: [
    TrainingInstanceEditOverviewComponent,
    TrainingInstanceEditComponent,
    TrainingDefinitionSelectComponent,
    PoolAssignComponent,
  ],
  providers: [
    TrainingInstanceCanDeactivate,
    { provide: Kypo2UserAssignService, useClass: OrganizersAssignService },
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
