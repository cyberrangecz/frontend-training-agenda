import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {KypoPipesModule} from 'kypo-common';
import {OrganizersAssignService} from '../../../services/training-instance/organizers-assign/organizers-assign.service';
import {TrainingInstanceEditConcreteService} from '../../../services/training-instance/edit/training-instance-edit-concrete.service';
import {TrainingInstanceEditService} from '../../../services/training-instance/edit/training-instance-edit.service';
import {FreeFormModule} from '../../shared/free-form.module';
import {TrainingDefinitionSelectComponent} from './training-definition-select/training-definition-select.component';
import {TrainingInstanceEditOverviewMaterialModule} from './training-instance-edit-overview-material.module';
import {TrainingInstanceEditOverviewRoutingModule} from './training-instance-edit-overview-routing.module';
import {TrainingInstanceEditOverviewComponent} from './training-instance-edit-overview.component';
import {TrainingInstanceEditComponent} from './training-instance-edit/training-instance-edit.component';
import {Kypo2UserAssignModule, Kypo2UserAssignService} from 'kypo2-user-assign';
import {KypoControlsModule} from 'kypo-controls';
import {PoolAssignComponent} from './pool-assign/pool-assign.component';
import {KypoListModule} from 'kypo-list';
import {TrainingInstanceCanDeactivate} from '../../../services/can-deactivate/training-instance-can-deactivate.service';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      Kypo2UserAssignModule,
      KypoListModule,
      FreeFormModule,
      KypoPipesModule,
      TrainingInstanceEditOverviewMaterialModule,
      TrainingInstanceEditOverviewRoutingModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      KypoControlsModule,
    ],
  declarations: [
    TrainingInstanceEditOverviewComponent,
    TrainingInstanceEditComponent,
    TrainingDefinitionSelectComponent,
    PoolAssignComponent
  ],
  providers: [
    TrainingInstanceCanDeactivate,
    { provide: Kypo2UserAssignService, useClass: OrganizersAssignService },
    { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService }
  ]
})
export class TrainingInstanceEditOverviewComponentsModule {
}
