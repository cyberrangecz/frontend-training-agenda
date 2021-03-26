import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { CloneDialogFormGroup } from './clone-dialog-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Displays dialog with a form to select name of cloned training definition
 */
@Component({
  selector: 'kypo-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloneDialogComponent extends SentinelBaseDirective implements OnInit {
  cloneDialogFormGroup: CloneDialogFormGroup;
  valid = true;

  constructor(
    public dialogRef: MatDialogRef<CloneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition
  ) {
    super();
  }

  get clonedDefinitionTitle(): AbstractControl {
    return this.cloneDialogFormGroup.formGroup.get('clonedDefinitionTitle');
  }

  ngOnInit(): void {
    this.cloneDialogFormGroup = new CloneDialogFormGroup();
    this.clonedDefinitionTitle.setValue('Clone of ' + this.data.title);
    this.cloneDialogFormGroup.formGroup.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => (this.valid = this.cloneDialogFormGroup.formGroup.valid));
  }

  /**
   * Closes the dialog with 'confirm' result and inserted title of clened training definition
   */
  confirm(): void {
    if (this.cloneDialogFormGroup.formGroup.valid) {
      this.dialogRef.close({
        title: this.clonedDefinitionTitle.value,
      });
    }
  }

  /**
   * Closes the dialog with no result
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
