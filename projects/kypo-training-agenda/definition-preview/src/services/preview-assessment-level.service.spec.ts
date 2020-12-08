import { TestBed } from '@angular/core/testing';
import { asyncData } from '@sentinel/common';
import { Question } from '@muni-kypo-crp/training-model';
import { TrainingAgendaConfig } from '../../../src/model/training-agenda-config';
import { createRunningTrainingRunServiceSpy } from '../../../internal/src/testing/testing-commons.spec';
import { TrainingAgendaContext } from '../../../internal/src/services/context/training-agenda-context.service';
import { RunningTrainingRunService } from '../../../internal/src/services/training-run/running/running-training-run.service';
import { PreviewAssessmentLevelService } from './preview-assessment-level.service';

describe('PreviewAssessmentLevelService', () => {
  let service: PreviewAssessmentLevelService;
  let context: TrainingAgendaContext;
  let runningTrainingRunSpy: jasmine.SpyObj<RunningTrainingRunService>;

  beforeEach(() => {
    const config = new TrainingAgendaConfig();
    config.pollingPeriod = 5000;
    config.defaultPaginationSize = 10;
    context = new TrainingAgendaContext(config);
    runningTrainingRunSpy = createRunningTrainingRunServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        PreviewAssessmentLevelService,
        { provide: RunningTrainingRunService, useValue: runningTrainingRunSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
    });
    service = TestBed.inject(PreviewAssessmentLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit answers', (done) => {
    runningTrainingRunSpy.next.and.returnValue(asyncData(createMock()));
    service.submit().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(createMock());
      expect(runningTrainingRunSpy.next).toHaveBeenCalledTimes(1);
      done();
    });
  });

  function createMock(): Question[] {
    const quest1 = new DummyQuestion('Question 1');
    const quest2 = new DummyQuestion('Question 2');
    return [quest1, quest2];
  }

  class DummyQuestion extends Question {
    constructor(title: string) {
      super(title);
    }
  }
});
