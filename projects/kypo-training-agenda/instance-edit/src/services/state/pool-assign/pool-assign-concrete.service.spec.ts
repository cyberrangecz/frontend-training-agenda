import { async, TestBed } from '@angular/core/testing';
import { asyncData, RequestedPagination, PaginatedResource, SentinelPagination } from '@sentinel/common';
import { PoolApi } from 'kypo-sandbox-api';
import { Pool } from 'kypo-sandbox-model';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingInstance } from 'kypo-training-model';
import { throwError } from 'rxjs';
import {
  createContext,
  createErrorHandlerSpy,
  createNotificationSpy,
  createPoolApiSpy,
  createTrainingInstanceApiSpy,
} from '../../../../../internal/src/testing/testing-commons.spec';
import { TrainingErrorHandler } from '../../../../../src/services/training-error.handler.service';
import { TrainingNotificationService } from '../../../../../src/services/training-notification.service';
import { TrainingAgendaContext } from '../../../../../internal/src/services/context/training-agenda-context.service';
import { PoolAssignConcreteService } from './pool-assign-concrete.service';

describe('PoolAssignConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let poolApiSpy: jasmine.SpyObj<PoolApi>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let service: PoolAssignConcreteService;
  let context: TrainingAgendaContext;

  beforeEach(async(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    trainingInstanceApiSpy = createTrainingInstanceApiSpy();
    poolApiSpy = createPoolApiSpy();
    notificationSpy = createNotificationSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        PoolAssignConcreteService,
        { provide: TrainingInstanceApi, useValue: trainingInstanceApiSpy },
        { provide: PoolApi, useValue: poolApiSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
    });
    service = TestBed.inject(PoolAssignConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init service', () => {
    const trainingInstance = createInstanceMock();
    service.init(trainingInstance);
    service.assignedPool$.subscribe((res) => expect(res).toEqual(trainingInstance.poolId));
  });

  it('should get all pools', (done) => {
    poolApiSpy.getPools.and.returnValue(asyncData(createPoolsPaginatedMock()));
    service.getAll(createPagination()).subscribe(
      (_) => done(),
      (_) => fail
    );
    expect(poolApiSpy.getPools).toHaveBeenCalledTimes(1);
  });

  it('should emit error when get all pools fails', (done) => {
    poolApiSpy.getPools.and.returnValue(throwError(null));
    service.getAll(createPagination()).subscribe(
      (_) => fail,
      (_) => done()
    );
    expect(poolApiSpy.getPools).toHaveBeenCalledTimes(1);
  });

  it('should assign pools', (done) => {
    trainingInstanceApiSpy.assignPool.and.returnValue(asyncData(0));
    const trainingInstance = createInstanceMock();
    const pool = createPoolMock();
    service.init(trainingInstance);
    service.select(pool);
    service.assign(trainingInstance).subscribe(
      (res) => {
        expect(trainingInstanceApiSpy.assignPool).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        expect(res).toEqual(0);
        service.assignedPool$.subscribe((val) => expect(val).toEqual(pool.id));
        done();
      },
      (_) => fail
    );
  });

  it('should throw error when assign pools fails', (done) => {
    trainingInstanceApiSpy.assignPool.and.returnValue(throwError(null));
    const trainingInstance = createInstanceMock();
    const pool = createPoolMock();
    service.init(trainingInstance);
    service.select(pool);
    service.assign(trainingInstance).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should unassign pools', (done) => {
    trainingInstanceApiSpy.unassignPool.and.returnValue(asyncData(0));
    poolApiSpy.getPools.and.returnValue(asyncData(createPoolsPaginatedMock()));
    const trainingInstance = createInstanceMock();
    const pool = createPoolMock();
    service.init(trainingInstance);
    service.select(pool);
    service.unassign(trainingInstance).subscribe(
      (res) => {
        expect(trainingInstanceApiSpy.unassignPool).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        expect(res).toEqual(createPoolsPaginatedMock());
        service.assignedPool$.subscribe((val) => expect(val).toEqual(undefined));
        done();
      },
      (_) => fail
    );
  });

  it('should throw error when unassign pools fails', (done) => {
    trainingInstanceApiSpy.unassignPool.and.returnValue(throwError(null));
    const trainingInstance = createInstanceMock();
    const pool = createPoolMock();
    service.init(trainingInstance);
    service.select(pool);
    service.unassign(trainingInstance).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createInstanceMock(): TrainingInstance {
    const trainingInstance = new TrainingInstance();
    trainingInstance.id = 2;
    trainingInstance.poolId = 4;
    return trainingInstance;
  }

  function createPoolsPaginatedMock(): PaginatedResource<Pool> {
    const pool1 = new Pool();
    pool1.id = 0;
    const pool2 = new Pool();
    pool2.id = 1;
    return new PaginatedResource([pool1, pool2], new SentinelPagination(1, 2, 2, 2, 1));
  }

  function createPoolMock(): Pool {
    const pool = new Pool();
    pool.id = 2;
    return pool;
  }
});
