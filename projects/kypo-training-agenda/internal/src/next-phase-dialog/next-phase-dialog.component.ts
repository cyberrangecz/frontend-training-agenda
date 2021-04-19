import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NextPhaseDialogConfig } from './next-phase-dialog-config';

@Component({
  selector: 'kypo-next-phase-dialog',
  templateUrl: './next-phase-dialog.component.html',
  styleUrls: ['./next-phase-dialog.component.css'],
})
export class NextPhaseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NextPhaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NextPhaseDialogConfig
  ) {
    dialogRef.disableClose = true;
  }
}
