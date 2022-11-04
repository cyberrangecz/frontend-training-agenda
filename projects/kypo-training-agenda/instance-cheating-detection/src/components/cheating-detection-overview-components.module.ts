import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngfModule } from 'angular-file';
import { SentinelPipesModule } from '@sentinel/common';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelTableModule } from '@sentinel/components/table';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { PaginationService, TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { CheatingDetectionConcreteService } from '../services/cheating-detection-concrete.service';
import { CheatingDetectionService } from '../services/cheating-detection.service';
import { CheatingDetectionOverviewMaterialModule } from './cheating-detection-overview-material.module';
import { CheatingDetectionOverviewComponent } from './cheating-detection-overview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ngfModule,
    SentinelPipesModule,
    CheatingDetectionOverviewMaterialModule,
    ReactiveFormsModule,
    SentinelTableModule,
    SentinelControlsModule,
  ],
  declarations: [CheatingDetectionOverviewComponent],
  providers: [
    PaginationService,
    TrainingAgendaContext,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: CheatingDetectionService, useClass: CheatingDetectionConcreteService },
  ],
})
export class CheatingDetectionOverviewComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CheatingDetectionOverviewComponentsModule> {
    return {
      ngModule: CheatingDetectionOverviewComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
