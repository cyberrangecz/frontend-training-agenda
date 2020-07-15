import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { FileUploadProgressService } from '../../services/file-upload/file-upload-progress.service';

/**
 * Component of training definition upload dialog window
 */
@Component({
  selector: 'kypo-training-upload-dialog',
  templateUrl: './training-definition-upload-dialog.component.html',
  styleUrls: ['./training-definition-upload-dialog.component.css'],
})
export class TrainingDefinitionUploadDialogComponent extends SentinelBaseDirective implements OnInit {
  selectedFile: File;
  uploadInProgress$: Observable<boolean>;
  onUpload$ = new EventEmitter<File>();

  constructor(
    public dialogRef: MatDialogRef<TrainingDefinitionUploadDialogComponent>,
    private uploadProgressService: FileUploadProgressService
  ) {
    super();
    this.uploadInProgress$ = this.uploadProgressService.isInProgress$;
  }

  ngOnInit() {}

  /**
   * Cancels the upload and closes the dialog window with no result
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Emits upload event with selected file
   */
  upload() {
    this.onUpload$.emit(this.selectedFile);
  }

  /**
   * Removes selected file
   */
  clearFile() {
    this.selectedFile = null;
  }
}
