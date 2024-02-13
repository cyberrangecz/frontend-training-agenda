import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventDetailComponent } from './training-instance-detection-event-detail.component';
import { SentinelTableModule } from '@sentinel/components/table';
import { PaginationService, TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingAgendaConfig, TrainingDefaultNavigator, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { DetectionEventService } from '../services/detection-event/detection-event.service';
import { DetectionEventConcreteService } from '../services/detection-event/detection-event-concrete.service';
import { DetectionEventParticipantService } from '../services/participant/detection-event-participant.service';
import { DetectionEventParticipantConcreteService } from '../services/participant/detection-event-participant-concrete.service';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { MatCardModule } from '@angular/material/card';
import { TrainingInstanceDetectionEventDetailMaterialModule } from './training-instance-detection-event-detail-material.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TimelineModule } from '@muni-kypo-crp/command-visualizations/timeline';

@NgModule({
  imports: [
    CommonModule,
    SentinelTableModule,
    SentinelPipesModule,
    TrainingInstanceDetectionEventDetailMaterialModule,
    MatCardModule,
    MatTabsModule,
    TimelineModule,
  ],
  declarations: [TrainingInstanceDetectionEventDetailComponent],
  providers: [
    PaginationService,
    TrainingAgendaContext,
    { provide: TrainingNavigator, useClass: TrainingDefaultNavigator },
    { provide: DetectionEventService, useClass: DetectionEventConcreteService },
    { provide: DetectionEventParticipantService, useClass: DetectionEventParticipantConcreteService },
  ],
})
export class TrainingInstanceDetectionEventDetailComponentsModule {
  static forRoot(
    config: TrainingAgendaConfig
  ): ModuleWithProviders<TrainingInstanceDetectionEventDetailComponentsModule> {
    return {
      ngModule: TrainingInstanceDetectionEventDetailComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
