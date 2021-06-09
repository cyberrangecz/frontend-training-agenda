import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RequestedPagination, SentinelPagination, PaginatedResource, asyncData } from '@sentinel/common';
import { SandboxInstanceApi } from '@muni-kypo-crp/sandbox-api';
import { SandboxAllocationUnitsApi } from '@muni-kypo-crp/sandbox-api';
import { TrainingInstanceApi, TrainingRunApi } from '@muni-kypo-crp/training-api';
import { throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import {
  createContext,
  createDialogSpy,
  createErrorHandlerSpy,
  createNotificationSpy,
  createSauApi,
  createSandboxInstanceApiSpy,
  createTrainingInstanceApiSpy,
  createTrainingRunApiSpy,
} from '../../../../../internal/src/testing/testing-commons.spec';
import { TrainingErrorHandler } from '../../../../../src/services/training-error.handler.service';
import { TrainingNotificationService } from '../../../../../src/services/training-notification.service';
import { TrainingAgendaContext } from '../../../../../internal/src/services/context/training-agenda-context.service';
import { ActiveTrainingRunConcreteService } from './active-training-run-concrete.service';

describe('ActiveTrainingRunConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let trainingRunApiSpy: jasmine.SpyObj<TrainingRunApi>;
  let sandboxInstanceApiSpy: jasmine.SpyObj<SandboxInstanceApi>;
  let sauApiSpy: jasmine.SpyObj<SandboxAllocationUnitsApi>;
  let service: ActiveTrainingRunConcreteService;
  let context: TrainingAgendaContext;

  beforeEach(async(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    notificationSpy = createNotificationSpy();
    sandboxInstanceApiSpy = createSandboxInstanceApiSpy();
    sauApiSpy = createSauApi();
    trainingInstanceApiSpy = createTrainingInstanceApiSpy();
    trainingRunApiSpy = createTrainingRunApiSpy();
    dialogSpy = createDialogSpy();
    context = createContext();
    TestBed.configureTestingModule({
      providers: [
        ActiveTrainingRunConcreteService,
        { provide: MatDialog, useValue: dialogSpy },
        { provide: TrainingInstanceApi, useValue: trainingInstanceApiSpy },
        { provide: TrainingRunApi, useValue: trainingRunApiSpy },
        { provide: SandboxAllocationUnitsApi, useValue: sauApiSpy },
        { provide: SandboxInstanceApi, useValue: sandboxInstanceApiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
    });
    service = TestBed.inject(ActiveTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit hasError on err', (done) => {
    const pagination = createPagination();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(throwError(null));
    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      )
      .subscribe(
        (hasError) => {
          expect(hasError).toBeTruthy();
          done();
        },
        () => fail
      );
    service.getAll(0, pagination).subscribe(
      () => fail,
      (_) => _
    );
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(asyncData(mockData));

    service.getAll(1, createPagination()).pipe(take(1)).subscribe();
    const subscription = service.resource$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null)
    );

    service.getAll(1, createPagination()).pipe(take(1)).subscribe();
    const subscription = service.resource$.subscribe();
    assertPoll(3);
    tick(5 * context.config.pollingPeriod);
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData)
    );

    service.getAll(1, pagination).pipe(take(1)).subscribe();
    const subscription = service.resource$.subscribe();
    assertPoll(3);
    tick(context.config.pollingPeriod);
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    tick(5 * context.config.pollingPeriod);
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    service.getAll(0, pagination).pipe(take(1)).subscribe();
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(5);
    assertPoll(3, 5);
    subscription.unsubscribe();
  }));

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new PaginatedResource([], new SentinelPagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes = 1) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(context.config.pollingPeriod);
      calledTimes = calledTimes + 1;
      expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
