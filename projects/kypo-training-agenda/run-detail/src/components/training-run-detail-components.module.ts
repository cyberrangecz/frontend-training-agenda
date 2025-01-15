import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { LevelComponentsModule } from './level/level-components.module';
import { TrainingRunDetailMaterialModule } from './training-run-detail-material.module';
import { TrainingRunDetailComponent } from './training-run-detail.component';
import { SentinelUserCardModule } from '@sentinel/layout/user-card';
import { DividerPositionSynchronizerService } from '../services/training-run/level/synchronization/divider-position/divider-position-synchronizer.service';
import { PersistentDividerPositionSynchronizerService } from '../services/training-run/level/synchronization/divider-position/persistent-divider-position-synchronizer.service';
import { TopologySizeSynchronizerService } from '../services/training-run/level/synchronization/topology-size/topology-size-synchronizer.service';
import { TopologySizeSynchronizerConcreteService } from '../services/training-run/level/synchronization/topology-size/topology-size-synchronizer-concrete.service';

/**
 * Contains all components of training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailMaterialModule,
    LevelComponentsModule,
    RouterModule,
    SentinelPipesModule,
    SentinelStepperModule,
    SentinelUserCardModule,
  ],
  declarations: [TrainingRunDetailComponent],
  exports: [TrainingRunDetailComponent],
  providers: [
    { provide: DividerPositionSynchronizerService, useClass: PersistentDividerPositionSynchronizerService },
    { provide: TopologySizeSynchronizerService, useClass: TopologySizeSynchronizerConcreteService },
  ],
})
export class TrainingRunDetailComponentsModule {}
