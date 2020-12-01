import { ChangeDetectorRef } from '@angular/core';
import { CloneDialogComponent } from './clone-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TrainingDefinitionEditOverviewMaterialModule } from '../../../../definition-edit/src/components/training-definition-edit-overview-material.module';
import { TrainingDefinition, Level, GameLevel, AssessmentLevel, InfoLevel } from '@kypo/training-model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelPipesModule } from '@sentinel/common';
import { createDialogRefSpy } from '../../../../internal/src/testing/testing-commons.spec';

describe('CloneDialogComponent', () => {
  let component: CloneDialogComponent;
  let fixture: ComponentFixture<CloneDialogComponent>;
  let cd: ChangeDetectorRef;

  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<CloneDialogComponent>>;

  beforeEach(async(() => {
    matDialogRefSpy = createDialogRefSpy();
    TestBed.configureTestingModule({
      imports: [TrainingDefinitionEditOverviewMaterialModule, SentinelPipesModule, BrowserAnimationsModule],
      declarations: [CloneDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: createMock(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneDialogComponent);
    component = fixture.componentInstance;
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init values', () => {
    expect(component.cloneDialogFormGroup).toBeTruthy();
    expect(component.clonedDefinitionTitle).toBeTruthy();
    expect(component.valid).toBeTrue();
  });

  it('should close dialog with confirm result', () => {
    component.confirm();
    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
    expect(matDialogRefSpy.close).toHaveBeenCalledWith({ title: jasmine.anything() });
  });

  it('should close dialog with no result', () => {
    component.cancel();
    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
  });

  function createMock(): TrainingDefinition {
    const td = new TrainingDefinition();
    td.id = 2;
    td.title = 'TD 2';
    td.levels = createLevelsMock();
    td.description = '';
    td.prerequisites = [];
    return td;
  }

  function createLevelsMock(): Level[] {
    const level1 = new GameLevel();
    const level2 = new AssessmentLevel();
    const level3 = new InfoLevel();
    return [level1, level2, level3];
  }
});
