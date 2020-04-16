import { async, TestBed } from '@angular/core/testing';
import { KypoRequestedPagination } from 'kypo-common';
import { KypoPaginatedResource } from 'kypo-common';
import { asyncData } from 'kypo-common';
import { KypoPagination } from 'kypo-common';
import { TrainingDefinitionApi } from 'kypo-training-api';
import { TrainingDefinitionInfo } from 'kypo-training-model';
import { throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { TrainingErrorHandler } from '../../client/training-error.handler';
import { TrainingDefinitionOrganizerSelectConcreteService } from './training-definition-organizer-select-concrete.service';

describe('TrainingDefinitionOrganizerSelectorService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let tdApiSpy: jasmine.SpyObj<TrainingDefinitionApi>;
  let service: TrainingDefinitionOrganizerSelectConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('TrainingErrorHandler', ['emit']);
    tdApiSpy = jasmine.createSpyObj('TrainingDefinitionApi', ['getAllForOrganizer']);

    TestBed.configureTestingModule({
      providers: [
        TrainingDefinitionOrganizerSelectConcreteService,
        { provide: TrainingDefinitionApi, useValue: tdApiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
      ],
    });
    service = TestBed.inject(TrainingDefinitionOrganizerSelectConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load training definitions from facade (called once)', (done) => {
    tdApiSpy.getAllForOrganizer.and.returnValue(asyncData(createMock()));
    const pagination = createPagination();
    service.getAll(pagination, 'RELEASED').subscribe((_) => done(), fail);
    expect(tdApiSpy.getAllForOrganizer).toHaveBeenCalledTimes(1);
  });

  it('should call error handler on err', (done) => {
    tdApiSpy.getAllForOrganizer.and.returnValue(throwError(null));
    const pagination = createPagination();
    service.getAll(pagination, 'RELEASED').subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should emit hasError on err', (done) => {
    tdApiSpy.getAllForOrganizer.and.returnValue(throwError(null));
    const pagination = createPagination();
    service.hasError$
      .pipe(skip(2)) // we ignore initial value and value emitted before the call is made
      .subscribe((emitted) => {
        expect(emitted).toBeTruthy();
        done();
      }, fail);
    service
      .getAll(pagination, 'RELEASED')
      .pipe(take(1))
      .subscribe(fail, (_) => _);
  });

  it('should emit next value on get', (done) => {
    const mockData = createMock();
    tdApiSpy.getAllForOrganizer.and.returnValue(asyncData(mockData));
    const pagination = createPagination();
    service.resource$.pipe(skip(1)).subscribe((emitted) => {
      expect(emitted).toBe(mockData);
      done();
    }, fail);

    service
      .getAll(pagination, 'RELEASED')
      .pipe(take(1))
      .subscribe((_) => _, fail);
  });

  function createPagination() {
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMock() {
    const td1 = new TrainingDefinitionInfo();
    td1.id = 0;
    const td2 = new TrainingDefinitionInfo();
    td2.id = 1;
    return new KypoPaginatedResource([td1, td2], new KypoPagination(1, 2, 5, 2, 1));
  }
});
