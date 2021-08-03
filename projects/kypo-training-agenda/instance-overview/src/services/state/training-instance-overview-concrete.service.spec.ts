import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData, PaginatedResource, SentinelPagination, RequestedPagination } from '@sentinel/common';
import { PoolApi } from '@muni-kypo-crp/sandbox-api';
import { Pool, SandboxInstance } from '@muni-kypo-crp/sandbox-model';
import { TrainingInstanceApi } from '@muni-kypo-crp/training-api';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { of, throwError } from 'rxjs';
import {
  createContext,
  createDialogSpy,
  createErrorHandlerSpy,
  createNavigatorSpy,
  createNotificationSpy,
  createPoolApiSpy,
  createRouterSpy,
  createTrainingInstanceApiSpy,
} from '../../../../internal/src/testing/testing-commons.spec';
import { TrainingErrorHandler } from '../../../../src/services/training-error.handler.service';
import { TrainingNavigator } from '../../../../src/services/training-navigator.service';
import { TrainingNotificationService } from '../../../../src/services/training-notification.service';
import { TrainingAgendaContext } from '../../../../internal/src/services/context/training-agenda-context.service';
import { TrainingInstanceOverviewConcreteService } from './training-instance-overview-concrete.service';
import { SentinelDialogResultEnum } from '@sentinel/components/dialogs';
import { MatDialog } from '@angular/material/dialog';

describe('TrainingInstanceOverviewConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
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
    dialogSpy = createDialogSpy();
    poolApiSpy = createPoolApiSpy();
    navigatorSpy = createNavigatorSpy();
    routerSpy = createRouterSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        TrainingInstanceOverviewConcreteService,
        { provide: MatDialog, useValue: dialogSpy },
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
      () => fail
    );
  });

  it('should emit error when get all training instances fails', (done) => {
    trainingInstanceApiSpy.getAll.and.returnValue(throwError(null));
    service.getAll(createPagination()).subscribe(
      () => fail,
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
    service.create().subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
      expect(navigatorSpy.toNewTrainingInstance).toHaveBeenCalledTimes(1);
    });
  });

  it('should redirect to training instance edit page', () => {
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    navigatorSpy.toTrainingInstanceEdit.and.returnValue('navigate');
    service.edit(2).subscribe(() => {
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
    trainingInstanceApiSpy.delete.and.returnValue(asyncData(null));
    trainingInstanceApiSpy.getAll.and.returnValue(asyncData(createInstancesPaginatedMock()));
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(SentinelDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.delete(createInstancesMock()[1]).subscribe(
      (res) => {
        expect(trainingInstanceApiSpy.delete).toHaveBeenCalledTimes(1);
        expect(res).toEqual(createInstancesPaginatedMock());
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        done();
      },
      () => fail
    );
  });

  it('should emit error when  delete training instance fails', (done) => {
    trainingInstanceApiSpy.delete.and.returnValue(throwError(null));
    trainingInstanceApiSpy.getAll.and.returnValue(asyncData(createInstancesPaginatedMock()));
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(SentinelDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.delete(createInstancesMock()[1]).subscribe(
      () => fail,
      (err) => {
        expect(trainingInstanceApiSpy.delete).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should get pool state', (done) => {
    const pool = createPoolMock();
    const paginatedSandboxes = createPaginatedSandboxesMock();
    poolApiSpy.getPool.and.returnValue(asyncData(pool));
    poolApiSpy.getPoolsSandboxes.and.returnValue(asyncData(paginatedSandboxes));
    service.getPoolState(2).subscribe((res) => {
      console.log(res);
      expect(res).toBeTruthy();
      expect(res).toEqual(
        `${pool.maxSize} (${
          paginatedSandboxes.elements.length - paginatedSandboxes.elements.filter((s) => s.lockId).length
        } free)`
      );
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

  function createPaginatedSandboxesMock(): PaginatedResource<SandboxInstance> {
    const sandbox1 = new SandboxInstance();
    sandbox1.id = 1;
    sandbox1.lockId = 1;
    sandbox1.allocationUnitId = 1;

    const sandbox2 = new SandboxInstance();
    sandbox2.id = 2;
    sandbox2.lockId = undefined;
    sandbox2.allocationUnitId = 2;

    const sandbox3 = new SandboxInstance();
    sandbox3.id = 3;
    sandbox3.lockId = 2;
    sandbox3.allocationUnitId = 3;

    const sandbox4 = new SandboxInstance();
    sandbox4.id = 4;
    sandbox4.lockId = undefined;
    sandbox4.allocationUnitId = 4;

    const sandbox5 = new SandboxInstance();
    sandbox5.id = 5;
    sandbox5.lockId = undefined;
    sandbox5.allocationUnitId = 5;

    return new PaginatedResource([sandbox1, sandbox2], new SentinelPagination(1, 2, 2, 2, 1));
  }

  function createInstancesMock(): TrainingInstance[] {
    const ti1 = new TrainingInstance();
    ti1.id = 0;
    const ti2 = new TrainingInstance();
    ti2.id = 1;
    return [ti1, ti2];
  }

  function createInstancesPaginatedMock(): PaginatedResource<TrainingInstance> {
    return new PaginatedResource(createInstancesMock(), new SentinelPagination(1, 2, 2, 2, 1));
  }
});
