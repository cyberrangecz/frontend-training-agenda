import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {KypoPipesModule} from 'kypo-common';
import {LevelEditService} from '../../../../services/training-definition/edit/level-edit.service';
import {FreeFormModule} from '../../../shared/free-form.module';
import {LevelEditComponentsModule} from './level-edit/level-edit-components.module';
import {LevelOverviewComponent} from './level-overview/level-overview.component';
import {TrainingLevelStepperComponent} from './training-level-stepper/training-level-stepper.component';
import {MatDividerModule} from '@angular/material/divider';
import {KypoControlsModule} from 'kypo-controls';
import {LevelEditConcreteService} from '../../../../services/training-definition/edit/level-edit-concrete.service';

/**
 * Module containing component and providers for training definition levels' overview
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      KypoPipesModule,
      LevelEditComponentsModule,
      ReactiveFormsModule,
      FreeFormModule,
      Kypo2StepperModule,
      MatDividerModule,
      KypoControlsModule
    ],
  declarations: [
    TrainingLevelStepperComponent,
    LevelOverviewComponent,
  ],
  providers: [
    {provide: LevelEditService, useClass: LevelEditConcreteService},
  ],
  exports: [
    LevelOverviewComponent
  ],
})
export class LevelOverviewComponentModule {

}
