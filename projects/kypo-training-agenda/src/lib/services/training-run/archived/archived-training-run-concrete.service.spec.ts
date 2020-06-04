import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { KypoPagination } from 'kypo-common';
import { KypoPaginatedResource } from 'kypo-common';
import { KypoRequestedPagination } from 'kypo-common';
import { asyncData } from 'kypo-common';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingRunApi } from 'kypo-training-api';
import { throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { TrainingErrorHandler } from '../../client/training-error.handler.service';
import { TrainingNotificationService } from '../../client/training-notification.service';
import { TrainingAgendaContext } from '../../internal/training-agenda-context.service';
import { ArchivedTrainingRunConcreteService } from './archived-training-run-concrete.service';

describe('ArchivedTrainingRunConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let trainingRunFacadeSpy: jasmine.SpyObj<TrainingRunApi>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let service: ArchivedTrainingRunConcreteService;
  let context: TrainingAgendaContext;

  beforeEach(async(() => {
    const config = new TrainingAgendaConfig();
    config.pollingPeriod = 5000;
    config.defaultPaginationSize = 10;

    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    trainingInstanceApiSpy = jasmine.createSpyObj('TrainingInstanceApi', ['getAssociatedTrainingRuns']);
    notificationSpy = jasmine.createSpyObj('TrainingNotificationService', ['emit']);
    trainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunApi', ['deleteMultiple']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    context = new TrainingAgendaContext(config);

    TestBed.configureTestingModule({
      providers: [
        ArchivedTrainingRunConcreteService,
        { provide: MatDialog, useValue: dialogSpy },
        { provide: TrainingInstanceApi, useValue: trainingInstanceApiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingAgendaContext, useValue: context },
        { provide: TrainingRunApi, useValue: trainingRunFacadeSpy },
      ],
    });
    service = TestBed.inject(ArchivedTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit hasError observable on err', (done) => {
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
        (_) => fail
      );
    service.getAll(1, createPagination()).subscribe(
      (_) => fail,
      (_) => done()
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
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new KypoPaginatedResource([], new KypoPagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 1) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(context.config.pollingPeriod);
      calledTimes = calledTimes + 1;
      expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
