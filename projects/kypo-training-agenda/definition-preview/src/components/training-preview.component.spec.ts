import { asyncData } from '@sentinel/common';
import { TrainingDefinitionEditOverviewMaterialModule } from '../../../definition-edit/src/components/training-definition-edit-overview-material.module';
import { TrainingPreviewComponent } from './training-preview.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Level, GameLevel, AssessmentLevel, InfoLevel, TrainingDefinition } from '@muni-kypo-crp/training-model';
import { RunningTrainingRunService } from '../../../internal/src/services/training-run/running/running-training-run.service';
import { ActivatedRoute } from '@angular/router';
import {
  createActivatedRouteSpy,
  createRunningTrainingRunServiceSpy,
} from '../../../internal/src/testing/testing-commons.spec';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';

describe('TrainingPreviewComponent', () => {
  let component: TrainingPreviewComponent;
  let fixture: ComponentFixture<TrainingPreviewComponent>;

  let previewServiceSpy: jasmine.SpyObj<RunningTrainingRunService>;
  let activeRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async(() => {
    previewServiceSpy = createRunningTrainingRunServiceSpy();
    activeRouteSpy = createActivatedRouteSpy();
    activeRouteSpy.data = asyncData({ trainingDefinition: createMock() });
    TestBed.configureTestingModule({
      imports: [TrainingDefinitionEditOverviewMaterialModule],
      declarations: [TrainingPreviewComponent],
      providers: [
        { provide: RunningTrainingRunService, useValue: previewServiceSpy },
        { provide: ActivatedRoute, useValue: activeRouteSpy },
        TrainingDefinitionApi,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
