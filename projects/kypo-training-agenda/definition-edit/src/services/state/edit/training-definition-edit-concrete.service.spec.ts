import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { asyncData } from '@sentinel/common';
import { TrainingDefinitionApi } from 'kypo-training-api';
import { TrainingDefinition, TrainingDefinitionStateEnum } from 'kypo-training-model';
import { throwError } from 'rxjs';
import { TrainingDefinitionChangeEvent } from '../../../model/events/training-definition-change-event';
import {
  createContext,
  createErrorHandlerSpy,
  createNavigatorSpy,
  createNotificationSpy,
  createRouterSpy,
  createTrainingDefinitionApiSpy,
} from '../../../../../internal/src/testing/testing-commons.spec';
import { TrainingErrorHandler } from '../../../../../src/services/training-error.handler.service';
import { TrainingNavigator } from '../../../../../src/services/training-navigator.service';
import { TrainingNotificationService } from '../../../../../src/services/training-notification.service';
import { TrainingAgendaContext } from '../../../../../internal/src/services/context/training-agenda-context.service';
import { TrainingDefinitionEditConcreteService } from './training-definition-edit-concrete.service';

describe('TrainingDefinitionEditConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let apiSpy: jasmine.SpyObj<TrainingDefinitionApi>;
  let service: TrainingDefinitionEditConcreteService;
  let context: TrainingAgendaContext;
  let navigatorSpy: jasmine.SpyObj<TrainingNavigator>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    notificationSpy = createNotificationSpy();
    apiSpy = createTrainingDefinitionApiSpy();
    navigatorSpy = createNavigatorSpy();
    routerSpy = createRouterSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        TrainingDefinitionEditConcreteService,
        { provide: Router, useValue: routerSpy },
        { provide: TrainingNavigator, useValue: navigatorSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingDefinitionApi, useValue: apiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
    });
    service = TestBed.inject(TrainingDefinitionEditConcreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set training definition as currently edited', () => {
    service.set(createMock());
    service.trainingDefinition$.subscribe((td) => {
      expect(td).toEqual(createMock());
    });
    service.editMode$.subscribe((isEdit) => {
      expect(isEdit).toBeTruthy();
    });
  });

  it('should create new training definition if set is not called with one', () => {
    service.set(null);
    service.trainingDefinition$.subscribe((td) => {
      expect(td).toEqual(new TrainingDefinition());
    });
  });

  it('should save existing training definition', (done) => {
    apiSpy.update.and.returnValue(asyncData(0));
    service.set(createMock());
    service.save().subscribe(
      (res) => {
        expect(apiSpy.update).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        expect(res).toEqual(0);
        done();
      },
      (_) => fail
    );
  });

  it('should save new training definition', (done) => {
    apiSpy.create.and.returnValue(asyncData(createMock()));
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    service.save().subscribe(
      (res) => {
        expect(apiSpy.create).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
        expect(navigatorSpy.toTrainingDefinitionOverview).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when save existing training definition fails', (done) => {
    apiSpy.update.and.returnValue(throwError(null));
    service.set(createMock());
    service.save().subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should emit error when save new training definition fails', (done) => {
    apiSpy.create.and.returnValue(throwError(null));
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    service.save().subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should create training definition and stay on edit page', (done) => {
    apiSpy.create.and.returnValue(asyncData(createMock()));
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    service.createAndStay().subscribe(
      (res) => {
        expect(apiSpy.create).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
        expect(navigatorSpy.toTrainingDefinitionEdit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when create training definition and stay on edit page fails', (done) => {
    apiSpy.create.and.returnValue(throwError(null));
    routerSpy.navigate.and.returnValue(asyncData(true).toPromise());
    service.createAndStay().subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should update and save snapshot of edited training definition', () => {
    service.change(new TrainingDefinitionChangeEvent(createMock(), false));
    service.saveDisabled$.subscribe((idDisabled) => expect(idDisabled).toBeTruthy());
  });

  function createMock(): TrainingDefinition {
    const def1 = new TrainingDefinition();
    def1.id = 0;
    def1.title = 'Def1';
    def1.state = TrainingDefinitionStateEnum.Released;

    return def1;
  }
});
