import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CheatingDetectionEditComponent } from './cheating-detection-edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SentinelFreeFormModule } from '@sentinel/components/free-form';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CheatingDetectionOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/instance-cheating-detection';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { CheatingDetectionEditService } from '../services/cheating-detection-edit.service';
import { CheatingDetectionEditConcreteService } from '../services/cheating-detection-edit-concrete.service';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    SentinelFreeFormModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    SentinelControlsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatInputModule,
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
