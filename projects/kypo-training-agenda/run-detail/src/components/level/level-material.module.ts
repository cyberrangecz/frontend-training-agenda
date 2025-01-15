import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrainingTimerComponent } from './training-timer/training-timer.component';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { SplitContainerComponent } from './sandbox-interaction-level/subcomponents/split-container/split-container.component';

/**
 * Material component imports for training run level module
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    AsyncPipe,
    NgTemplateOutlet,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    TrainingTimerComponent,
    SplitContainerComponent,
  ],
  declarations: [TrainingTimerComponent, SplitContainerComponent],
})
export class LevelMaterialModule {}
