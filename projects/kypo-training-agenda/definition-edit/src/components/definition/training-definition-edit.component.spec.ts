import { FreeFormModule } from 'kypo-training-agenda/internal';
import { TrainingDefinitionEditComponent } from './training-definition-edit.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ChangeDetectorRef, SimpleChanges, SimpleChange } from '@angular/core';
import { TrainingDefinition, GameLevel, Level, AssessmentLevel, InfoLevel } from 'kypo-training-model';
import { TrainingDefinitionChangeEvent } from '../../model/events/training-definition-change-event';
import { MaterialTestingModule } from '../../../../internal/src/testing/material-testing.module';

describe('TrainingDefinitionEditComponent', () => {
  let component: TrainingDefinitionEditComponent;
  let fixture: ComponentFixture<TrainingDefinitionEditComponent>;
  let cd: ChangeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialTestingModule, FreeFormModule],
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
    const addEvent = { isAdded: true, validity: true };
    const deleteEvent = { isDeleted: true, validity: true, index: 0 };
    const clearEvent = { cleared: true, validity: true };
    const baseEvent = { validity: true, index: 0, items: ['Prereq'] };
    component.trainingDefinition = createMock();
    component.ngOnChanges(createSimpleChanges(createMock()));
    component.prerequisitesChange(addEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual(['']);

    component.prerequisitesChange(deleteEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual([]);

    component.prerequisitesChange(addEvent);
    component.prerequisitesChange(clearEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual([]);

    component.prerequisitesChange(addEvent);
    component.prerequisitesChange(baseEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('prerequisites').value).toEqual(['Prereq']);
  });

  it('change form state when outcomes event is emited', () => {
    const addEvent = { isAdded: true, validity: true };
    const deleteEvent = { isDeleted: true, validity: true, index: 0 };
    const clearEvent = { cleared: true, validity: true };
    const baseEvent = { validity: true, index: 0, items: ['Prereq'] };
    component.trainingDefinition = createMock();
    component.ngOnChanges(createSimpleChanges(createMock()));
    component.outcomesChange(addEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual(['']);

    component.outcomesChange(deleteEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual([]);

    component.outcomesChange(addEvent);
    component.outcomesChange(clearEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual([]);

    component.outcomesChange(addEvent);
    component.outcomesChange(baseEvent);
    expect(component.trainingDefinitionEditFormGroup.formGroup.get('outcomes').value).toEqual(['Prereq']);
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

  function createSimpleChanges(resource: TrainingDefinition): SimpleChanges {
    const simpleChange = new SimpleChange(undefined, resource, true);
    return { trainingDefinition: simpleChange } as SimpleChanges;
  }
});
