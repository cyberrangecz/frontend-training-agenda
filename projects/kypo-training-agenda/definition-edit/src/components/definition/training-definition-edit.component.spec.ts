import { SentinelFreeFormModule } from '@sentinel/components/free-form';
import { TrainingDefinitionEditComponent } from './training-definition-edit.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ChangeDetectorRef, SimpleChanges, SimpleChange } from '@angular/core';
import { TrainingDefinition, GameLevel, Level, AssessmentLevel, InfoLevel } from '@kypo/training-model';
import { TrainingDefinitionChangeEvent } from '../../model/events/training-definition-change-event';
import { MaterialTestingModule } from '../../../../internal/src/testing/material-testing.module';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

describe('TrainingDefinitionEditComponent', () => {
  let component: TrainingDefinitionEditComponent;
  let fixture: ComponentFixture<TrainingDefinitionEditComponent>;
  let cd: ChangeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialTestingModule, SentinelFreeFormModule],
      declarations: [TrainingDefinitionEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionEditComponent);
    component = fixture.componentInstance;
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new TD edit form group', () => {
    component.trainingDefinition = createMock();
    component.ngOnChanges(createSimpleChanges(createMock()));
    expect(component.trainingDefinitionEditFormGroup).toBeTruthy();
  });

  it('should emit event on change', () => {
    spyOn(component.edited, 'emit');
    const td = createMock();
    component.trainingDefinition = td;
    component.ngOnChanges(createSimpleChanges(td));
    component.trainingDefinitionEditFormGroup.formGroup.patchValue({ title: 'New Title' });
    td.title = 'New Title';
    expect(component.edited.emit).toHaveBeenCalledTimes(1);
    expect(component.edited.emit).toHaveBeenCalledWith(new TrainingDefinitionChangeEvent(td, true));
  });

  it('change form state when prerequisites event is emited', () => {
    let formGroup = createFormGroupMock(2, 'prerequisite');
    component.trainingDefinition = createMock();
    component.ngOnChanges(createSimpleChanges(createMock()));
    component.prerequisitesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual([
      'prerequisite0',
      'prerequisite1',
    ]);

    formGroup = createFormGroupMock(1, 'prerequisite');
    component.prerequisitesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual(['prerequisite0']);

    formGroup = createFormGroupMock(0, 'prerequisite');
    component.prerequisitesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual([]);

    formGroup = createFormGroupMock(1, 'prerequisite');
    component.prerequisitesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual(['prerequisite0']);
  });

  it('change form state when outcomes event is emited', () => {
    let formGroup = createFormGroupMock(2, 'outcome');
    component.trainingDefinition = createMock();
    component.ngOnChanges(createSimpleChanges(createMock()));
    component.outcomesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual(['outcome0', 'outcome1']);

    formGroup = createFormGroupMock(1, 'outcome');
    component.outcomesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual(['outcome0']);

    formGroup = createFormGroupMock(0, 'outcome');
    component.outcomesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual([]);

    formGroup = createFormGroupMock(1, 'outcome');
    component.outcomesChange(formGroup);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual(['outcome0']);
  });

  function createFormGroupMock(amount: number, name: string): FormGroup {
    const formData: string[] = [];
    for (let i = 0; i < amount; i++) {
      formData.push(name + i);
    }
    return new FormGroup({
      items: new FormArray(formData.map((prereq) => new FormControl(prereq))),
    });
  }

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

  function createSimpleChanges(resource: TrainingDefinition): SimpleChanges {
    const simpleChange = new SimpleChange(undefined, resource, true);
    return { trainingDefinition: simpleChange } as SimpleChanges;
  }
});
