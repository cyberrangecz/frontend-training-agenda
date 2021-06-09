import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { SentinelPagination, PaginatedResource, RequestedPagination, asyncData } from '@sentinel/common';
import { AdaptiveInstanceApi, AdaptiveRunApi, TrainingInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingRunApi } from '@muni-kypo-crp/training-api';
import { throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import {
  createAdaptiveInstanceApiSpy,
  createAdaptiveRunApiSpy,
  createContext,
  createDialogSpy,
  createErrorHandlerSpy,
  createNotificationSpy,
} from '../../../../../internal/src/testing/testing-commons.spec';
import { TrainingErrorHandler } from '../../../../../src/services/training-error.handler.service';
import { TrainingNotificationService } from '../../../../../src/services/training-notification.service';
import { TrainingAgendaContext } from '../../../../../internal/src/services/context/training-agenda-context.service';
import { ArchivedAdaptiveRunConcreteService } from './archived-adaptive-run-concrete.service';

describe('ArchivedTrainingRunConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let adaptiveInstanceApiSpy: jasmine.SpyObj<AdaptiveInstanceApi>;
  let adaptiveRunFacadeSpy: jasmine.SpyObj<AdaptiveRunApi>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let service: ArchivedAdaptiveRunConcreteService;
  let context: TrainingAgendaContext;

  beforeEach(async(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    adaptiveInstanceApiSpy = createAdaptiveInstanceApiSpy();
    notificationSpy = createNotificationSpy();
    adaptiveRunFacadeSpy = createAdaptiveRunApiSpy();
    dialogSpy = createDialogSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        ArchivedAdaptiveRunConcreteService,
        { provide: MatDialog, useValue: dialogSpy },
        { provide: AdaptiveInstanceApi, useValue: adaptiveInstanceApiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingAgendaContext, useValue: context },
        { provide: AdaptiveRunApi, useValue: adaptiveRunFacadeSpy },
      ],
    });
    service = TestBed.inject(ArchivedAdaptiveRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit hasError observable on err', (done) => {
    adaptiveInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(throwError(null));

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
    service.getAll(1, createPagination()).subscribe(
      () => fail,
      () => done()
    );
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    adaptiveInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(asyncData(mockData));
    service.getAll(1, createPagination()).pipe(take(1)).subscribe();
    const subscription = service.resource$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const mockData = createMock();
    adaptiveInstanceApiSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null)
    );

    service.getAll(1, createPagination()).pipe(take(1)).subscribe();
    const subscription = service.resource$.subscribe();
    assertPoll(3);
    tick(5 * context.config.pollingPeriod);
    expect(adaptiveInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    adaptiveInstanceApiSpy.getAssociatedTrainingRuns.and.returnValues(
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
    expect(adaptiveInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    tick(5 * context.config.pollingPeriod);
    expect(adaptiveInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    service.getAll(0, pagination).pipe(take(1)).subscribe();
    expect(adaptiveInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(5);
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
      expect(adaptiveInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
