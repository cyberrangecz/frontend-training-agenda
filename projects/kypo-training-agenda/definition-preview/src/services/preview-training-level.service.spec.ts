import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelDialogResultEnum } from '@sentinel/components/dialogs';
import { asyncData } from '@sentinel/common';
import { Hint, TrainingLevel } from '@muni-kypo-crp/training-model';
import { of } from 'rxjs';
import {
  createContext,
  createDialogSpy,
  createRunningTrainingRunServiceSpy,
} from '../../../internal/src/testing/testing-commons.spec';
import { TrainingAgendaContext } from '../../../internal/src/services/context/training-agenda-context.service';
import { RunningTrainingRunService } from '../../../internal/src/services/training-run/running/running-training-run.service';
import { PreviewTrainingLevelService } from './preview-training-level.service';

describe('PreviewTrainingLevelService', () => {
  let service: PreviewTrainingLevelService;
  let context: TrainingAgendaContext;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let runningTrainingRunSpy: jasmine.SpyObj<RunningTrainingRunService>;

  beforeEach(() => {
    dialogSpy = createDialogSpy();
    runningTrainingRunSpy = createRunningTrainingRunServiceSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        PreviewTrainingLevelService,
        { provide: RunningTrainingRunService, useValue: runningTrainingRunSpy },
        { provide: TrainingAgendaContext, useValue: context },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      imports: [MatDialogModule, BrowserAnimationsModule],
    });
    service = TestBed.inject(PreviewTrainingLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reveal solution', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(SentinelDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    const trainingLevel = createMock();
    service.init(trainingLevel);
    service.revealSolution(trainingLevel).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(trainingLevel.solution);
    });
  });

  it('should reveal hint', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(SentinelDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    const trainingLevel = createMock();
    service.init(trainingLevel);
    service.revealHint(createHints()[1]).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(createHints()[1]);
    });
  });

  it('should submit answer', (done) => {
    const answer = 'answer';
    const trainingLevel = createMock();
    runningTrainingRunSpy.next.and.returnValue(asyncData(answer));
    service.init(trainingLevel);
    service.submitAnswer(answer).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(answer);
      done();
    });
  });

  it('should submit wrong answer', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(SentinelDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    const answer = 'wrong answer';
    const trainingLevel = createMock();
    service.init(trainingLevel);
    service.submitAnswer(answer).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(SentinelDialogResultEnum.CONFIRMED);
    });
  });

  function createMock(): TrainingLevel {
    const trainingLevel = new TrainingLevel();
    trainingLevel.id = 0;
    trainingLevel.solution = 'solution';
    trainingLevel.hints = createHints();
    trainingLevel.answer = 'answer';
    trainingLevel.solutionPenalized = false;
    return trainingLevel;
  }

  function createHints(): Hint[] {
    const hint1 = new Hint();
    hint1.id = 0;
    hint1.content = 'Hint 1 content';
    const hint2 = new Hint();
    hint2.id = 1;
    hint2.content = 'Hint 2 content';
    const hint3 = new Hint();
    hint3.id = 2;
    hint3.content = 'Hint 3 content';
    return [hint1, hint2, hint3];
  }
});
