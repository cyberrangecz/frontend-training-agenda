import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInstanceDetectionEventComponent } from '../../../../../../../../../kypo-training-agenda/instance-detection-event/src/components/training-instance-detection-event.component';
import { CHEATING_DETECTION_EVENTS_PATH } from '@muni-kypo-crp/training-agenda';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceDetectionEventComponent,
  },
  {
    path: CHEATING_DETECTION_EVENTS_PATH,
    loadChildren: () =>
      import('./training-instance-detection-event.module').then((m) => m.TrainingInstanceDetectionEventModule),
    data: {
      title: 'Detection Events of Cheating Detection',
    },
  },
];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceDetectionEventRoutingModule {}
