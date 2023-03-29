import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventDetailComponent } from './training-instance-detection-event-detail.component';
import { MatCardModule } from '@angular/material/card';
import { SentinelTableModule } from '@sentinel/components/table';

@NgModule({
  imports: [CommonModule, MatCardModule, SentinelTableModule],
  declarations: [TrainingInstanceDetectionEventDetailComponent],
  providers: [],
})
export class TrainingInstanceDetectionEventDetailComponentsModule {
  static forRoot() {
    return {
      ngModule: TrainingInstanceDetectionEventDetailComponentsModule,
      providers: [],
    };
  }
}
