import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData, PaginatedResource, SentinelPagination, RequestedPagination } from '@sentinel/common';
import { PoolApi } from 'kypo-sandbox-api';
import { Pool } from 'kypo-sandbox-model';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingInstance } from 'kypo-training-model';
import { throwError } from 'rxjs';
import {
  createContext,
  createErrorHandlerSpy,
  createNavigatorSpy,
  createNotificationSpy,
  createPoolApiSpy,
  createRouterSpy,
  createTrainingInstanceApiSpy,
} from '../../testing/testing-commons';
import { TrainingErrorHandler } from '../client/training-error.handler.service';
import { TrainingNavigator } from '../client/training-navigator.service';
import { TrainingNotificationService } from '../client/training-notification.service';
import { TrainingAgendaContext } from '../internal/training-agenda-context.service';
import { TrainingInstanceOverviewConcreteService } from './training-instance-overview-concrete.service';

describe('TrainingInstanceOverviewConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let poolApiSpy: jasmine.SpyObj<PoolApi>;
  let service: TrainingInstanceOverviewConcreteService;
  let navigatorSpy: jasmine.SpyObj<TrainingNavigator>;
  let routerSpy: jasmine.SpyObj<Router>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let context: TrainingAgendaContext;

  beforeEach(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    notificationSpy = createNotificationSpy();
    trainingInstanceApiSpy = createTrainingInstanceApiSpy();
    poolApiSpy = createPoolApiSpy();
    navigatorSpy = createNavigatorSpy();
    routerSpy = createRouterSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        TrainingInstanceOverviewConcreteService,
        { provide: TrainingInstanceApi, useValue: trainingInstanceApiSpy },
        { provide: PoolApi, useValue: poolApiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingNavigator, useValue: navigatorSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(TrainingInstanceOverviewConcreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all training instances', (done) => {
    const trainingInstances = createInstancesPaginatedMock();
    trainingInstanceApiSpy.getAll.and.returnValue(asyncData(trainingInstances));
    service.getAll(createPagination()).subscribe(
      (res) => {
        expect(res).toEqual(trainingInstances);
        service.resource$.subscribe((val) => expect(val).toEqual(trainingInstances));
        expect(trainingInstanceApiSpy.getAll).toHaveBeenCalledTimes(1);
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when get all training instances fails', (done) => {
    trainingInstanceApiSpy.getAll.and.returnValue(throwError(null));
    service.getAll(createPagination()).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        expect(trainingInstanceApiSpy.getAll).toHaveBeenCalledTimes(1);
        service.hasError$.subscribe((val) => expect(val).toBeTrue());
        done();
      }
    );
  });

  it('should redirect to training instance creation page', () => {
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    navigatorSpy.toNewTrainingInstance.and.returnValue('navigate');
    service.create().subscribe((_) => {
      expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
      expect(navigatorSpy.toNewTrainingInstance).toHaveBeenCalledTimes(1);
    });
  });

  it('should redirect to training instance edit page', () => {
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    navigatorSpy.toTrainingInstanceEdit.and.returnValue('navigate');
    service.edit(2).subscribe((_) => {
      expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
      expect(navigatorSpy.toTrainingInstanceEdit).toHaveBeenCalledTimes(1);
    });
  });

  it('should download training instance', (done) => {
    trainingInstanceApiSpy.archive.and.returnValue(asyncData(true));
    service.download(2).subscribe((res) => {
      expect(trainingInstanceApiSpy.archive).toHaveBeenCalledTimes(1);
      expect(res).toEqual(true);
      done();
    });
  });

  it('should delete training instance', (done) => {
    trainingInstanceApiSpy.delete.and.returnValue(asyncData(true));
    trainingInstanceApiSpy.getAll.and.returnValue(asyncData(createInstancesPaginatedMock()));
    service.delete(2).subscribe(
      (res) => {
        expect(trainingInstanceApiSpy.delete).toHaveBeenCalledTimes(1);
        expect(res).toEqual(createInstancesPaginatedMock());
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when  delete training instance fails', (done) => {
    trainingInstanceApiSpy.delete.and.returnValue(throwError(null));
    service.delete(2).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(trainingInstanceApiSpy.delete).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should get pool state', (done) => {
    const pool = createPoolMock();
    poolApiSpy.getPool.and.returnValue(asyncData(pool));
    service.getPoolState(2).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(`${pool.maxSize} (${pool.maxSize - pool.usedSize} free)`);
      expect(poolApiSpy.getPool).toHaveBeenCalledTimes(1);
      done();
    });
  });

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createPoolMock(): Pool {
    const pool = new Pool();
    pool.id = 2;
    pool.maxSize = 5;
    pool.usedSize = 2;
    return pool;
  }

  function createInstancesPaginatedMock(): PaginatedResource<TrainingInstance> {
    const ti1 = new TrainingInstance();
    ti1.id = 0;
    const ti2 = new TrainingInstance();
    ti2.id = 1;
    return new PaginatedResource([ti1, ti2], new SentinelPagination(1, 2, 2, 2, 1));
  }
});
