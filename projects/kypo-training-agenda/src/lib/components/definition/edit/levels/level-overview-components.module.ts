import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {KypoPipesModule} from 'kypo-common';
import {LevelEditService} from '../../../../services/training-definition/edit/level-edit.service';
import {FreeFormModule} from '../../../shared/free-form.module';
import {MatDividerModule} from '@angular/material/divider';
import {KypoControlsModule} from 'kypo-controls';
import {LevelEditConcreteService} from '../../../../services/training-definition/edit/level-edit-concrete.service';
import {TrainingLevelStepperComponent} from './stepper/training-level-stepper.component';
import {LevelOverviewComponent} from './overview/level-overview.component';
import {LevelEditComponentsModule} from './level/level-edit-components.module';

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
export class LevelOverviewComponentsModule {

}
