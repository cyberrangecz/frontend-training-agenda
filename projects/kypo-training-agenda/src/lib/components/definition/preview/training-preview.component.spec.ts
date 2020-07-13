import { asyncData } from '@sentinel/common';
import { Kypo2UserApi } from 'kypo2-auth/lib/service/kypo2-user-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Kypo2AuthService } from 'kypo2-auth';
import { TrainingRunDetailComponentsModule } from './../../run/detail/training-run-detail-components.module';
import { TrainingDefinitionEditOverviewMaterialModule } from './../edit/training-definition-edit-overview-material.module';
import { TrainingPreviewComponent } from './training-preview.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { TrainingPreviewComponentsModule } from './training-preview-components.module';
import { Level, GameLevel, AssessmentLevel, InfoLevel, TrainingDefinition } from 'kypo-training-model';
import { RunningTrainingRunService } from '../../../services/training-run/running/running-training-run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { createActivatedRouteSpy, createRunningTrainingRunServiceSpy } from '../../../testing/testing-commons';
import { TrainingDefinitionApi } from 'kypo-training-api';

describe('TrainingPreviewComponent', () => {
  let component: TrainingPreviewComponent;
  let fixture: ComponentFixture<TrainingPreviewComponent>;
  let cd: ChangeDetectorRef;

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
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
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
