import { ngfModule } from 'angular-file';
import {
  createDialogRefSpy,
  createFileUploadProgressServiceSpy,
} from 'projects/kypo-training-agenda/src/lib/testing/testing-commons';
import { TrainingDefinitionUploadDialogComponent } from './training-definition-upload-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { TrainingDefinitionEditOverviewMaterialModule } from '../../edit/training-definition-edit-overview-material.module';
import { TrainingDefinition, Level, GameLevel, AssessmentLevel, InfoLevel } from 'kypo-training-model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadProgressService } from 'projects/kypo-training-agenda/src/lib/services/training-definition/overview/file-upload-progress.service';
import { asyncData, SentinelPipesModule } from '@sentinel/common';

describe('TrainingDefinitionUploadDialogComponent', () => {
  let component: TrainingDefinitionUploadDialogComponent;
  let fixture: ComponentFixture<TrainingDefinitionUploadDialogComponent>;
  let cd: ChangeDetectorRef;

  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<TrainingDefinitionUploadDialogComponent>>;
  let uploadProgressService: jasmine.SpyObj<FileUploadProgressService>;

  beforeEach(async(() => {
    matDialogRefSpy = createDialogRefSpy();
    uploadProgressService = createFileUploadProgressServiceSpy();
    uploadProgressService.isInProgress$ = asyncData(false);
    TestBed.configureTestingModule({
      imports: [TrainingDefinitionEditOverviewMaterialModule, SentinelPipesModule, BrowserAnimationsModule, ngfModule],
      declarations: [TrainingDefinitionUploadDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: FileUploadProgressService, useValue: uploadProgressService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionUploadDialogComponent);
    component = fixture.componentInstance;
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with no result', () => {
    component.cancel();
    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
  });

  it('should emit upload event', () => {
    spyOn(component.onUpload$, 'emit');
    component.upload();
    expect(component.onUpload$.emit).toHaveBeenCalledTimes(1);
  });

  it('should clear file', () => {
    component.selectedFile = new File([], '');
    component.clearFile();
    expect(component.selectedFile).toBeFalsy();
  });
});
