import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelDialogResultEnum } from '@sentinel/components/dialogs';
import { asyncData } from '@sentinel/common';
import { Task, TrainingPhase } from '@muni-kypo-crp/training-model';
import { of } from 'rxjs';
import {
  createContext,
  createDialogSpy,
  createRunningAdaptiveRunServiceSpy,
} from '../../../internal/src/testing/testing-commons.spec';
import { TrainingAgendaContext } from '../../../internal/src/services/context/training-agenda-context.service';
import { AdaptivePreviewTrainingPhaseService } from './adaptive-preview-training-phase.service';
import { RunningAdaptiveRunService } from '../../../internal/src/services/adaptive-run/running/running-adaptive-run.service';

describe('PreviewTrainingLevelService', () => {
  let service: AdaptivePreviewTrainingPhaseService;
  let context: TrainingAgendaContext;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let runningAdaptiveRunServiceSpy: jasmine.SpyObj<RunningAdaptiveRunService>;

  beforeEach(() => {
    dialogSpy = createDialogSpy();
    runningAdaptiveRunServiceSpy = createRunningAdaptiveRunServiceSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        AdaptivePreviewTrainingPhaseService,
        { provide: RunningAdaptiveRunService, useValue: runningAdaptiveRunServiceSpy },
        { provide: TrainingAgendaContext, useValue: context },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      imports: [MatDialogModule, BrowserAnimationsModule],
    });
    service = TestBed.inject(AdaptivePreviewTrainingPhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reveal solution', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(SentinelDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    const trainingPhase = createMock();
    service.init(trainingPhase);
    service.revealSolution().subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should submit answer', (done) => {
    const answer = 'answer';
    const trainingLevel = createMock();
    runningAdaptiveRunServiceSpy.next.and.returnValue(asyncData(answer));
    service.init(trainingLevel);
    service.submitAnswer(answer).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(answer);
      done();
    });
  });

  it('should submit wrong answer', () => {
    const answer = 'wrong answer';
    const trainingPhase = createMock();
    service.init(trainingPhase);
    service.submitAnswer(answer).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  function createMock(): TrainingPhase {
    const trainingPhase = new TrainingPhase();
    trainingPhase.id = 0;
    trainingPhase.title = 'Test Phase';
    trainingPhase.currentTask = new Task();
    trainingPhase.currentTask.solution = 'answer';
    return trainingPhase;
  }
});
