import { TestBed } from '@angular/core/testing';
import { asyncData } from 'kypo-common';
import { Question } from 'kypo-training-model';
import { Observable } from 'rxjs';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { createRunningTrainingRunServiceSpy } from '../../../testing/testing-commons';
import { TrainingAgendaContext } from '../../internal/training-agenda-context.service';
import { RunningTrainingRunService } from '../../training-run/running/running-training-run.service';
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
    service.submit(createMock()).subscribe((res) => {
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
