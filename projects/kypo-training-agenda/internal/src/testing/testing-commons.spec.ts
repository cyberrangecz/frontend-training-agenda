import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SandboxAllocationUnitsApi, SandboxInstanceApi } from 'kypo-sandbox-api';
import { PoolApi } from 'kypo-sandbox-api/lib/api/pool/pool.api.service';
import { TrainingDefinitionApi } from 'kypo-training-api';
import { TrainingInstanceApi } from 'kypo-training-api';
import { TrainingRunApi } from 'kypo-training-api/lib/api/run/training-run-api.service';
import { UserApi } from 'kypo-training-api/lib/api/user/user-api.service';
import { TrainingAgendaConfig } from '../../../src/model/training-agenda-config';
import { TrainingErrorHandler } from '../../../src/services/training-error.handler.service';
import { TrainingNavigator } from '../../../src/services/training-navigator.service';
import { TrainingNotificationService } from '../../../src/services/training-notification.service';
import { TrainingAgendaContext } from '../services/context/training-agenda-context.service';
import { RunningTrainingRunService } from '../services/training-run/running/running-training-run.service';
import { TrainingDefinitionEditService } from '../../../definition-edit/src/services/state/edit/training-definition-edit.service';
import { TrainingDefinitionService } from '../../../definition-overview/src/services/state/training-definition.service';
import { FileUploadProgressService } from '../../../definition-overview/src/services/file-upload/file-upload-progress.service';
import { SentinelAuthService } from '@sentinel/auth';

export function createErrorHandlerSpy(): jasmine.SpyObj<TrainingErrorHandler> {
  return jasmine.createSpyObj('TrainingErrorHandler', ['emit']);
}

export function createNotificationSpy(): jasmine.SpyObj<TrainingNotificationService> {
  return jasmine.createSpyObj('TrainingNotificationService', ['emit']);
}

export function createPoolApiSpy(): jasmine.SpyObj<PoolApi> {
  return jasmine.createSpyObj('PoolApi', ['getPools', 'getPool']);
}

export function createTrainingInstanceApiSpy(): jasmine.SpyObj<TrainingInstanceApi> {
  return jasmine.createSpyObj('TrainingInstanceApi', [
    'assignPool',
    'unassignPool',
    'getAll',
    'archive',
    'delete',
    'update',
    'create',
    'getAssociatedTrainingRuns',
    'getAssociatedTrainingRuns',
  ]);
}

export function createTrainingRunApiSpy(): jasmine.SpyObj<TrainingRunApi> {
  return jasmine.createSpyObj('TrainingRunApi', [
    'nextLevel',
    'finish',
    'submitAnswers',
    'getAccessed',
    'archive',
    'deleteMultiple',
  ]);
}

export function createTrainingDefinitionApiSpy(): jasmine.SpyObj<TrainingDefinitionApi> {
  return jasmine.createSpyObj('TrainingDefinitionApi', [
    'update',
    'create',
    'createGameLevel',
    'createInfoLevel',
    'createAssessmentLevel',
    'getLevel',
    'updateInfoLevel',
    'updateGameLevel',
    'updateAssessmentLevel',
    'deleteLevel',
    'getAll',
    'delete',
    'download',
    'clone',
    'changeState',
    'upload',
    'getAllForOrganizer',
  ]);
}

export function createSandboxInstanceApiSpy(): jasmine.SpyObj<SandboxInstanceApi> {
  return jasmine.createSpyObj('SandboxInstanceApi', ['getSandbox']);
}

export function createSauApi(): jasmine.SpyObj<SandboxAllocationUnitsApi> {
  return jasmine.createSpyObj('SandboxAllocationUnitsApi', ['createCleanupRequest']);
}

export function createUserApiSpy(): jasmine.SpyObj<UserApi> {
  return jasmine.createSpyObj('UserApi', [
    'getDesignersNotInTD',
    'getAuthors',
    'updateAuthors',
    'getOrganizersNotInTI',
    'getOrganizers',
    'updateOrganizers',
  ]);
}

export function createAuthSpy(): jasmine.SpyObj<SentinelAuthService> {
  return jasmine.createSpyObj('SentinelAuthService', ['']);
}

export function createNavigatorSpy(): jasmine.SpyObj<TrainingNavigator> {
  return jasmine.createSpyObj('TrainingNavigator', [
    'toTrainingRunResult',
    'toTrainingDefinitionOverview',
    'toTrainingDefinitionEdit',
    'toNewTrainingInstance',
    'toTrainingInstanceEdit',
    'toTrainingInstanceOverview',
    'toTrainingInstanceEdit',
    'toNewTrainingDefinition',
    'toTrainingDefinitionEdit',
    'toTrainingDefinitionPreview',
    'toTrainingInstanceProgress',
    'toTrainingInstanceResults',
    'toResumeTrainingRunGame',
    'toAccessTrainingRunGame',
    'toTrainingRunResult',
  ]);
}

export function createRouterSpy(): jasmine.SpyObj<Router> {
  return jasmine.createSpyObj('Router', ['navigate']);
}

export function createDialogSpy(): jasmine.SpyObj<MatDialog> {
  return jasmine.createSpyObj('MatDialog', ['open', 'close']);
}

export function createDialogRefSpy(): jasmine.SpyObj<MatDialogRef<any>> {
  return jasmine.createSpyObj(MatDialogRef, ['open', 'close']);
}

export function createRunningTrainingRunServiceSpy(): jasmine.SpyObj<RunningTrainingRunService> {
  return jasmine.createSpyObj('RunningTrainingRunService', ['next', 'init']);
}

export function createContext(): TrainingAgendaContext {
  const config = new TrainingAgendaConfig();
  config.pollingPeriod = 5000;
  config.defaultPaginationSize = 10;
  return new TrainingAgendaContext(config);
}
export function createActivatedRouteSpy(): jasmine.SpyObj<ActivatedRoute> {
  return jasmine.createSpyObj('ActivatedRoute', ['']);
}

export function createTrainingDefinitionEditServiceSpy(): jasmine.SpyObj<TrainingDefinitionEditService> {
  return jasmine.createSpyObj('TrainingDefinitionEditService', ['change', 'set']);
}

export function createTrainingDefinitionServiceSpy(): jasmine.SpyObj<TrainingDefinitionService> {
  return jasmine.createSpyObj('TrainingDefinitionService', ['getAll']);
}

export function createFileUploadProgressServiceSpy(): jasmine.SpyObj<FileUploadProgressService> {
  return jasmine.createSpyObj('FileUploadProgressService', ['']);
}
