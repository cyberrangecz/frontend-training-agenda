import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { ActivatedRoute } from '@angular/router';
import { AdaptiveDefinitionOverviewComponent } from './adaptive-definition-overview.component';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { TrainingDefinitionService } from '@muni-kypo-crp/training-agenda/definition-overview';
import {
  createActivatedRouteSpy,
  createNavigatorSpy,
  createPaginationServiceSpy,
  createTrainingDefinitionServiceSpy,
} from '../../../internal/src/testing/testing-commons.spec';
import { Level, AssessmentLevel, InfoLevel, TrainingDefinition, TrainingLevel } from '@muni-kypo-crp/training-model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { asyncData, PaginatedResource, SentinelPagination, RequestedPagination } from '@sentinel/common';
import { LoadTableEvent, SentinelTableModule } from '@sentinel/components/table';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { MaterialTestingModule } from '../../../internal/src/testing/material-testing.module';
import { AdaptiveDefinitionService } from '../services/state/adaptive-definition.service';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';

describe('AdaptiveDefinitionOverviewComponent', () => {
  let component: AdaptiveDefinitionOverviewComponent;
  let fixture: ComponentFixture<AdaptiveDefinitionOverviewComponent>;

  let navigatorSpy: jasmine.SpyObj<TrainingNavigator>;
  let paginationServiceSpy: jasmine.SpyObj<PaginationService>;
  let adaptiveDefinitionServiceSpy: jasmine.SpyObj<TrainingDefinitionService>;

  beforeEach(async(() => {
    navigatorSpy = createNavigatorSpy();
    paginationServiceSpy = createPaginationServiceSpy();
    adaptiveDefinitionServiceSpy = createTrainingDefinitionServiceSpy();
    initValues();
    TestBed.configureTestingModule({
      imports: [MaterialTestingModule, SentinelTableModule, BrowserAnimationsModule, SentinelControlsModule],
      declarations: [AdaptiveDefinitionOverviewComponent],
      providers: [
        { provide: TrainingNavigator, useValue: navigatorSpy },
        { provide: PaginationService, useValue: paginationServiceSpy },
        { provide: AdaptiveDefinitionService, useValue: adaptiveDefinitionServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptiveDefinitionOverviewComponent);
    component = fixture.componentInstance;
    navigatorSpy.toAdaptiveDefinitionDetail.and.returnValue('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init values', () => {
    adaptiveDefinitionServiceSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    fixture.detectChanges();
    expect(component.controls.length).toEqual(2);
    component.hasError$.subscribe((val) => expect(val).toBeFalse());
    component.isLoading$.subscribe((val) => expect(val).toBeFalse());
    component.trainingDefinitions$.subscribe((val) => expect(val).toBeTruthy());
  });

  it('should get data for table', () => {
    adaptiveDefinitionServiceSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    paginationServiceSpy.getPagination.and.returnValue(1);
    component.onLoadEvent(new LoadTableEvent(new RequestedPagination(1, 1, '', ''), ''));
    expect(adaptiveDefinitionServiceSpy.getAll).toHaveBeenCalledTimes(1);
    expect(adaptiveDefinitionServiceSpy.getAll).toHaveBeenCalledWith(new RequestedPagination(1, 1, '', ''), '');
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
    const level1 = new TrainingLevel();
    const level2 = new AssessmentLevel();
    const level3 = new InfoLevel();
    return [level1, level2, level3];
  }

  function initValues() {
    adaptiveDefinitionServiceSpy.hasError$ = asyncData(false);
    adaptiveDefinitionServiceSpy.isLoading$ = asyncData(false);
    adaptiveDefinitionServiceSpy.resource$ = asyncData(createPaginatedMock());
  }
});
