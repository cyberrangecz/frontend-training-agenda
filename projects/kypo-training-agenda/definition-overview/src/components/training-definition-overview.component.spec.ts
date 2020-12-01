import { TrainingAgendaContext } from '@kypo/training-agenda/internal';
import { ActivatedRoute } from '@angular/router';
import { TrainingDefinitionOverviewComponent } from './training-definition-overview.component';
import { ChangeDetectorRef } from '@angular/core';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { TrainingDefinitionService } from '@kypo/training-agenda/definition-overview';
import {
  createActivatedRouteSpy,
  createContext,
  createTrainingDefinitionServiceSpy,
} from '../../../internal/src/testing/testing-commons.spec';
import { Level, GameLevel, AssessmentLevel, InfoLevel, TrainingDefinition } from '@kypo/training-model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { asyncData, PaginatedResource, SentinelPagination, RequestedPagination } from '@sentinel/common';
import { LoadTableEvent, SentinelTableModule } from '@sentinel/components/table';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { MaterialTestingModule } from '../../../internal/src/testing/material-testing.module';

describe('TrainingDefinitionOverviewComponent', () => {
  let component: TrainingDefinitionOverviewComponent;
  let fixture: ComponentFixture<TrainingDefinitionOverviewComponent>;
  let cd: ChangeDetectorRef;

  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let context: TrainingAgendaContext;
  let trainingDefinitionServiceSpy: jasmine.SpyObj<TrainingDefinitionService>;

  beforeEach(async(() => {
    activatedRouteSpy = createActivatedRouteSpy();
    context = createContext();
    trainingDefinitionServiceSpy = createTrainingDefinitionServiceSpy();
    initValues();
    TestBed.configureTestingModule({
      imports: [MaterialTestingModule, SentinelTableModule, BrowserAnimationsModule, SentinelControlsModule],
      declarations: [TrainingDefinitionOverviewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: TrainingAgendaContext, useValue: context },
        { provide: TrainingDefinitionService, useValue: trainingDefinitionServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionOverviewComponent);
    component = fixture.componentInstance;
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init values', fakeAsync(() => {
    trainingDefinitionServiceSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    fixture.detectChanges();
    expect(component.controls.length).toEqual(2);
    component.hasError$.subscribe((val) => expect(val).toBeFalse());
    component.isLoading$.subscribe((val) => expect(val).toBeFalse());
    component.trainingDefinitions$.subscribe((val) => expect(val).toBeTruthy());
  }));

  it('should get data for table', () => {
    trainingDefinitionServiceSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    component.onLoadEvent(new LoadTableEvent(new RequestedPagination(1, 1, '', ''), ''));
    expect(trainingDefinitionServiceSpy.getAll).toHaveBeenCalledTimes(1);
    expect(trainingDefinitionServiceSpy.getAll).toHaveBeenCalledWith(new RequestedPagination(1, 1, '', ''), '');
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

  function createPaginatedMock(): PaginatedResource<TrainingDefinition> {
    return new PaginatedResource([createMock()], new SentinelPagination(1, 1, 1, 1, 1));
  }

  function createLevelsMock(): Level[] {
    const level1 = new GameLevel();
    const level2 = new AssessmentLevel();
    const level3 = new InfoLevel();
    return [level1, level2, level3];
  }

  function initValues() {
    trainingDefinitionServiceSpy.hasError$ = asyncData(false);
    trainingDefinitionServiceSpy.isLoading$ = asyncData(false);
    trainingDefinitionServiceSpy.resource$ = asyncData(createPaginatedMock());
  }
});
