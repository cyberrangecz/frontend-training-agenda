import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SandboxInstanceApi } from 'kypo-sandbox-api/lib/api/instance/sandbox-instance-api.service';
import { PoolApi } from 'kypo-sandbox-api/lib/api/pool/pool.api.service';
import { PoolRequestApi } from 'kypo-sandbox-api/lib/api/request/pool-request-api.service';
import { TrainingDefinitionApi } from 'kypo-training-api/lib/api/definition/training-definition-api.service';
import { TrainingInstanceApi } from 'kypo-training-api/lib/api/instance/training-instance-api.service';
import { TrainingRunApi } from 'kypo-training-api/lib/api/run/training-run-api.service';
import { UserApi } from 'kypo-training-api/lib/api/user/user-api.service';
import { Kypo2AuthService } from 'kypo2-auth/lib/service/kypo2-auth.service';
import { TrainingAgendaConfig } from '../model/client/training-agenda-config';
import { TrainingErrorHandler } from '../services/client/training-error.handler.service';
import { TrainingNavigator } from '../services/client/training-navigator.service';
import { TrainingNotificationService } from '../services/client/training-notification.service';
import { TrainingAgendaContext } from '../services/internal/training-agenda-context.service';
import { RunningTrainingRunService } from '../services/training-run/running/running-training-run.service';

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

export function createRequestApiSpy(): jasmine.SpyObj<PoolRequestApi> {
  return jasmine.createSpyObj('PoolRequestApi', ['createCleanupRequest']);
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

export function createAuthSpy(): jasmine.SpyObj<Kypo2AuthService> {
  return jasmine.createSpyObj('Kypo2AuthService', ['']);
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
  return jasmine.createSpyObj('MatDialog', ['open']);
}

export function createRunningTrainingRunServiceSpy(): jasmine.SpyObj<RunningTrainingRunService> {
  return jasmine.createSpyObj('RunningTrainingRunService', ['next']);
}

export function createContext(): TrainingAgendaContext {
  const config = new TrainingAgendaConfig();
  config.pollingPeriod = 5000;
  config.defaultPaginationSize = 10;
  return new TrainingAgendaContext(config);
}
