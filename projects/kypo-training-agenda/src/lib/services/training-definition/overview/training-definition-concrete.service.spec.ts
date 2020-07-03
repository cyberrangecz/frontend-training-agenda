import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CsirtMuConfirmationDialogComponent, CsirtMuDialogResultEnum } from 'csirt-mu-common';
import { asyncData, KypoFilter, KypoPaginatedResource, KypoPagination, KypoRequestedPagination } from 'kypo-common';
import { TrainingDefinitionApi } from 'kypo-training-api';
import { TrainingDefinition, TrainingDefinitionStateEnum } from 'kypo-training-model';
import { Observable, of, throwError } from 'rxjs';
import { TrainingAgendaConfig } from '../../../model/client/training-agenda-config';
import {
  createContext,
  createDialogSpy,
  createErrorHandlerSpy,
  createNavigatorSpy,
  createNotificationSpy,
  createTrainingDefinitionApiSpy,
} from '../../../testing/testing-commons';
import { TrainingErrorHandler } from '../../client/training-error.handler.service';
import { TrainingNavigator } from '../../client/training-navigator.service';
import { TrainingNotificationService } from '../../client/training-notification.service';
import { TrainingAgendaContext } from '../../internal/training-agenda-context.service';
import { FileUploadProgressService } from './file-upload-progress.service';
import { TrainingDefinitionConcreteService } from './training-definition.concrete.service';

describe('TrainingDefinitionConcreteService', () => {
  let errorHandlerSpy: jasmine.SpyObj<TrainingErrorHandler>;
  let notificationSpy: jasmine.SpyObj<TrainingNotificationService>;
  let apiSpy: jasmine.SpyObj<TrainingDefinitionApi>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let service: TrainingDefinitionConcreteService;
  let context: TrainingAgendaContext;
  let navigatorSpy: jasmine.SpyObj<TrainingNavigator>;

  beforeEach(() => {
    errorHandlerSpy = createErrorHandlerSpy();
    notificationSpy = createNotificationSpy();
    apiSpy = createTrainingDefinitionApiSpy();
    dialogSpy = createDialogSpy();
    navigatorSpy = createNavigatorSpy();
    context = createContext();

    TestBed.configureTestingModule({
      providers: [
        TrainingDefinitionConcreteService,
        FileUploadProgressService,
        { provide: MatDialog, useValue: dialogSpy },
        { provide: TrainingNavigator, useValue: navigatorSpy },
        { provide: TrainingNotificationService, useValue: notificationSpy },
        { provide: TrainingDefinitionApi, useValue: apiSpy },
        { provide: TrainingErrorHandler, useValue: errorHandlerSpy },
        { provide: TrainingAgendaContext, useValue: context },
      ],
      imports: [
        MatDialogModule,
        RouterTestingModule.withRoutes([
          { path: 'create', redirectTo: '' },
          { path: 'edit', redirectTo: '' },
          { path: 'preview', redirectTo: '' },
        ]),
      ],
    });
    service = TestBed.inject(TrainingDefinitionConcreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all training definitions', (done) => {
    apiSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    service.getAll(createPagination(), 'filter').subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toEqual(createPaginatedMock());
        done();
      },
      (_) => fail
    );
    expect(apiSpy.getAll).toHaveBeenCalledTimes(1);
    expect(apiSpy.getAll).toHaveBeenCalledWith(createPagination(), [new KypoFilter('title', 'filter')]);
  });

  it('should emit error when get all training definitions fails', (done) => {
    apiSpy.getAll.and.returnValue(throwError(null));
    service.getAll(createPagination(), 'filter').subscribe(
      (res) => fail,
      (_) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      }
    );
    expect(apiSpy.getAll).toHaveBeenCalledTimes(1);
    expect(apiSpy.getAll).toHaveBeenCalledWith(createPagination(), [new KypoFilter('title', 'filter')]);
  });

  it('should redirects to training definition creation page', (done) => {
    navigatorSpy.toNewTrainingDefinition.and.returnValue('create');
    service.create().subscribe(
      (_) => done(),
      (err) => fail
    );
    expect(navigatorSpy.toNewTrainingDefinition).toHaveBeenCalledTimes(1);
  });

  it('should redirects to training definition edit page', (done) => {
    navigatorSpy.toTrainingDefinitionEdit.and.returnValue('edit');
    service.edit(new TrainingDefinition()).subscribe(
      (_) => done(),
      (err) => fail
    );
    expect(navigatorSpy.toTrainingDefinitionEdit).toHaveBeenCalledTimes(1);
  });

  it('should redirects to training definition preview page', (done) => {
    navigatorSpy.toTrainingDefinitionPreview.and.returnValue('preview');
    service.preview(new TrainingDefinition()).subscribe(
      (_) => done(),
      (err) => fail
    );
    expect(navigatorSpy.toTrainingDefinitionPreview).toHaveBeenCalledTimes(1);
  });

  it('should delete level', (done) => {
    apiSpy.delete.and.returnValue(asyncData(null));
    apiSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(CsirtMuDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.delete(createMock()[1]).subscribe(
      (res) => {
        expect(apiSpy.delete).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        expect(res).toEqual(createPaginatedMock());
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when delete level fails', (done) => {
    apiSpy.delete.and.returnValue(throwError(null));
    apiSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(CsirtMuDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.delete(createMock()[1]).subscribe(
      (_) => fail,
      (err) => {
        expect(apiSpy.delete).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should clone training definition', (done) => {
    apiSpy.clone.and.returnValue(asyncData(1));
    apiSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    const trainingDefinition = createMock()[1];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(trainingDefinition), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.clone(createMock()[1]).subscribe(
      (res) => {
        expect(apiSpy.clone).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledTimes(1);
        expect(notificationSpy.emit).toHaveBeenCalledWith('success', jasmine.anything());
        expect(res).toEqual(createPaginatedMock());
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when clone training definition fails', (done) => {
    apiSpy.clone.and.returnValue(throwError(null));
    apiSpy.getAll.and.returnValue(asyncData(createPaginatedMock()));
    const trainingDefinition = createMock()[1];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(trainingDefinition), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.clone(trainingDefinition).subscribe(
      (_) => fail,
      (err) => {
        expect(apiSpy.clone).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should emit error when download training definition fails', (done) => {
    apiSpy.download.and.returnValue(throwError(null));
    const trainingDefinition = createMock()[1];
    service.download(trainingDefinition).subscribe(
      (_) => fail,
      (err) => {
        expect(apiSpy.download).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  it('should change state of training definition', (done) => {
    apiSpy.changeState.and.returnValue(asyncData(1));
    const trainingDefinition = createMock()[1];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(CsirtMuDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.changeState(trainingDefinition, TrainingDefinitionStateEnum.Archived).subscribe(
      (res) => {
        expect(apiSpy.changeState).toHaveBeenCalledTimes(1);
        expect(apiSpy.changeState).toHaveBeenCalledWith(1, TrainingDefinitionStateEnum.Archived);
        expect(res).toEqual(1);
        done();
      },
      (_) => fail
    );
  });

  it('should emit error when change state of training definition fails', (done) => {
    apiSpy.changeState.and.returnValue(throwError(null));
    const trainingDefinition = createMock()[1];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(CsirtMuDialogResultEnum.CONFIRMED), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    service.changeState(trainingDefinition, TrainingDefinitionStateEnum.Archived).subscribe(
      (_) => fail,
      (err) => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        expect(errorHandlerSpy.emit).toHaveBeenCalledWith(err, jasmine.anything());
        done();
      }
    );
  });

  function createMock(): TrainingDefinition[] {
    const def1 = new TrainingDefinition();
    def1.id = 0;
    def1.title = 'Def1';
    def1.state = TrainingDefinitionStateEnum.Released;
    const def2 = new TrainingDefinition();
    def2.id = 1;
    def2.title = 'Def2';
    def2.state = TrainingDefinitionStateEnum.Released;
    const def3 = new TrainingDefinition();
    def3.id = 2;
    def3.title = 'Def3';
    def3.state = TrainingDefinitionStateEnum.Released;

    return [def1, def2, def3];
  }

  function createPaginatedMock(): KypoPaginatedResource<TrainingDefinition> {
    return new KypoPaginatedResource<TrainingDefinition>(createMock(), new KypoPagination(1, 3, 3, 3, 1));
  }

  function createPagination() {
    return new KypoRequestedPagination(1, 3, '', '');
  }
});
