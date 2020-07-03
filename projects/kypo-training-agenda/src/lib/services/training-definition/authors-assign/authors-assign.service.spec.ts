import { async, TestBed } from '@angular/core/testing';
import { KypoPagination } from 'kypo-common';
import { KypoPaginatedResource } from 'kypo-common';
import { asyncData } from 'kypo-common';
import { KypoRequestedPagination } from 'kypo-common';
import { UserApi } from 'kypo-training-api';
import { User } from 'kypo2-auth';
import { throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import { createContext, createErrorHandlerSpy, createUserApiSpy } from '../../../testing/testing-commons';
import { TrainingErrorHandler } from '../../client/training-error.handler.service';
import { TrainingAgendaContext } from '../../internal/training-agenda-context.service';
import { AuthorsAssignService } from './authors-assign.service';

describe('AuthorsAssignService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let apiSpy: jasmine.SpyObj<UserApi>;
  let service: AuthorsAssignService;
  let context: TrainingAgendaContext;

  beforeEach(async(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    apiSpy = createUserApiSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        AuthorsAssignService,
        { provide: UserApi, useValue: apiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
    });
    service = TestBed.inject(AuthorsAssignService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load authors from facade (called once)', (done) => {
    apiSpy.getAuthors.and.returnValue(asyncData(createMock()));
    const pagination = createPagination();
    service.getAssigned(0, pagination).subscribe((_) => done(), fail);
    expect(apiSpy.getAuthors).toHaveBeenCalledTimes(1);
  });

  it('should load designers from facade (called once)', (done) => {
    apiSpy.getDesignersNotInTD.and.returnValue(asyncData(createMock()));
    service.getAvailableToAssign(0).subscribe((_) => done(), fail);
    expect(apiSpy.getDesignersNotInTD).toHaveBeenCalledTimes(1);
  });

  it('should assign designers through facade (called once)', (done) => {
    apiSpy.updateAuthors.and.returnValue(asyncData(null));
    apiSpy.getAuthors.and.returnValue(asyncData(createMock()));
    const usersToAssign = createMock().elements;
    const idsToAssign = usersToAssign.map((user) => user.id);
    service.assign(0, usersToAssign).subscribe((_) => done(), fail);
    expect(apiSpy.updateAuthors).toHaveBeenCalledTimes(1);
    expect(apiSpy.updateAuthors).toHaveBeenCalledWith(0, idsToAssign, []);
  });

  it('should refresh authors after assign action', (done) => {
    apiSpy.updateAuthors.and.returnValue(asyncData(null));
    apiSpy.getAuthors.and.returnValue(asyncData(createMock()));
    const usersToAssign = createMock().elements;
    service.assign(0, usersToAssign).subscribe((_) => {
      expect(apiSpy.getAuthors).toHaveBeenCalledTimes(1);
      done();
    }, fail);
  });

  it('should unassign authors through facade (called once)', (done) => {
    apiSpy.updateAuthors.and.returnValue(asyncData(null));
    apiSpy.getAuthors.and.returnValue(asyncData(createMock()));
    const usersToUnassign = createMock().elements;
    const idsToUnassign = usersToUnassign.map((user) => user.id);
    service.unassign(0, usersToUnassign).subscribe((_) => done(), fail);
    expect(apiSpy.updateAuthors).toHaveBeenCalledTimes(1);
    expect(apiSpy.updateAuthors).toHaveBeenCalledWith(0, [], idsToUnassign);
  });

  it('should refresh authors after unassign action', (done) => {
    apiSpy.updateAuthors.and.returnValue(asyncData(null));
    apiSpy.getAuthors.and.returnValue(asyncData(createMock()));
    const usersToUnassign = createMock().elements;
    service.unassign(0, usersToUnassign).subscribe((_) => {
      expect(apiSpy.getAuthors).toHaveBeenCalledTimes(1);
      done();
    }, fail);
  });

  it('should call error handler on err (getAvailableToAssign)', (done) => {
    apiSpy.getDesignersNotInTD.and.returnValue(throwError(null));
    service.getAvailableToAssign(0).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should call error handler on err (getAssigned)', (done) => {
    apiSpy.getAuthors.and.returnValue(throwError(null));
    service.getAssigned(0, null).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should call error handler on err (assign)', (done) => {
    apiSpy.updateAuthors.and.returnValue(throwError(null));
    service.assign(0, []).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should call error handler on err (unassign)', (done) => {
    apiSpy.updateAuthors.and.returnValue(throwError(null));
    service.unassign(0, []).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should emit hasError on err', (done) => {
    apiSpy.getAuthors.and.returnValue(throwError(null));
    const pagination = createPagination();
    service.hasError$
      .pipe(skip(2)) // we ignore initial value and value emitted before the call is made
      .subscribe((emitted) => {
        expect(emitted).toBeTruthy();
        done();
      }, fail);
    service
      .getAssigned(0, pagination)
      .pipe(take(1))
      .subscribe(fail, (_) => _);
  });

  it('should emit next value on getAuthors', (done) => {
    const mockData = createMock();
    apiSpy.getAuthors.and.returnValue(asyncData(mockData));
    const pagination = createPagination();
    service.assignedUsers$.pipe(skip(1)).subscribe((emitted) => {
      expect(emitted).toBe(mockData);
      done();
    }, fail);
    service
      .getAssigned(0, pagination)
      .pipe(take(1))
      .subscribe((_) => _, fail);
  });

  function createPagination() {
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMock() {
    const user1 = new User([]);
    user1.id = 1;
    const user2 = new User([]);
    user2.id = 2;
    return new KypoPaginatedResource([user1, user2], new KypoPagination(1, 2, 5, 2, 1));
  }
});
