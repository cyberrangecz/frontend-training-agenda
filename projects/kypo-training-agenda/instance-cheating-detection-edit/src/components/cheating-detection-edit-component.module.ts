import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CheatingDetectionEditComponent } from './cheating-detection-edit.component';
import { SentinelFreeFormModule } from '@sentinel/components/free-form';
import { ReactiveFormsModule } from '@angular/forms';
import { CheatingDetectionOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/instance-cheating-detection';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { CheatingDetectionEditService } from '../services/cheating-detection-edit.service';
import { CheatingDetectionEditConcreteService } from '../services/cheating-detection-edit-concrete.service';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { CheatingDetectionEditMaterialModule } from './cheating-detection-edit-material.module';

@NgModule({
  imports: [
    CommonModule,
    SentinelFreeFormModule,
    ReactiveFormsModule,
    CheatingDetectionEditMaterialModule,
    SentinelControlsModule,
  ],
  declarations: [CheatingDetectionEditComponent],
  providers: [{ provide: CheatingDetectionEditService, useClass: CheatingDetectionEditConcreteService }],
})
export class TrainingInstanceCheatingDetectionEditComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CheatingDetectionOverviewComponentsModule> {
    return {
      ngModule: TrainingInstanceCheatingDetectionEditComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
