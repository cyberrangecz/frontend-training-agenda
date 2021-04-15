import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCaseExceptPipe } from './pipes/title-case-except.pipe';
import { NextPhaseDialogComponent } from './next-phase-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [NextPhaseDialogComponent, TitleCaseExceptPipe],
  exports: [NextPhaseDialogComponent, TitleCaseExceptPipe],
  imports: [CommonModule, MatProgressSpinnerModule, MatDialogModule],
})
export class NextPhaseDialogModule {}
