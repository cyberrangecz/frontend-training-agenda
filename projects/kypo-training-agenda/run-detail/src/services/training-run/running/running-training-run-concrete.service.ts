import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingRunApi } from '@muni-kypo-crp/training-api';
import { AccessTrainingRunInfo } from '@muni-kypo-crp/training-model';
import { Level } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { RunningTrainingRunService } from './running-training-run.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent, LoadingDialogConfig } from '@muni-kypo-crp/training-agenda/internal';
import { EMPTY } from 'rxjs';
import { ConsoleUrl, TopologyApi } from '@muni-kypo-crp/topology-graph';

/**
 * Main service for running training training. Holds levels and its state. Handles user general training run user actions and events.
 * Subscribe to activeLevel$ to receive latest data updates.
 */
@Injectable()
export class RunningTrainingRunConcreteService extends RunningTrainingRunService {
  constructor(
    private api: TrainingRunApi,
    private topologyService: TopologyApi,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

  private activeLevels: Level[] = [];
  private startTime: Date;
  private isStepperDisplayed: boolean;
  private backwardMode: boolean;

  /**
   * Initializes the service from training run access info
   * @param trainingRunInfo
   */
  init(trainingRunInfo: AccessTrainingRunInfo): void {
    this.trainingRunId = trainingRunInfo.trainingRunId;
    this.sandboxInstanceId = trainingRunInfo.sandboxInstanceId;
    this.sandboxDefinitionId = trainingRunInfo.sandboxDefinitionId;
    this.localEnvironment = trainingRunInfo.localEnvironment;
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.startTime = trainingRunInfo.startTime;
    this.activeLevels = trainingRunInfo.levels as Level[];
    this.setActiveLevel(trainingRunInfo.currentLevel as Level);
    this.backwardMode = trainingRunInfo.backwardMode;
    this.isCurrentLevelAnsweredSubject$.next(trainingRunInfo.isLevelAnswered);
  }

  getLevels(): Level[] {
    return this.activeLevels;
  }

  getActiveLevel(): Level {
    return this.activeLevelSubject$.getValue();
  }

  getActiveLevelPosition(): number {
    return this.activeLevels.findIndex((level) => level?.id === this.getActiveLevel()?.id);
  }

  getStartTime(): Date {
    return this.startTime;
  }

  getIsStepperDisplayed(): boolean {
    return this.isStepperDisplayed;
  }
  /**
   * Sends request to move to next level. If response is successful, the next level in order is set as active
   */
  next(): Observable<any> {
    return this.isLast() ? this.callApiToFinish() : this.callApiToNextLevel();
  }

  moveToLevel(levelId: number): Observable<Level> {
    return this.api.moveToLevel(this.trainingRunId, levelId).pipe(
      tap(
        (level) => this.setBacktrackedLevel(level),
        (err) => this.errorHandler.emit(err, 'Moving to next level')
      )
    );
  }

  isLast(): boolean {
    return this.getActiveLevel()?.id === this.activeLevels[this.activeLevels.length - 1]?.id;
  }

  /**
   * Clears current TR related attributes
   */
  clear(): void {
    this.trainingRunId = undefined;
    this.sandboxInstanceId = undefined;
    this.sandboxDefinitionId = undefined;
    this.localEnvironment = undefined;
    this.startTime = undefined;
    this.activeLevelSubject$.next(undefined);
    this.activeLevels = [];
  }

  /**
   * Sends request to preload VM consoles on backend for user for further use in topology.
   * @param sandboxId id of sandbox in which the vm exists
   */
  loadConsoles(sandboxId: number): Observable<ConsoleUrl[]> {
    return this.topologyService.getVMConsolesUrl(sandboxId).pipe(
      tap({
        error: (err) => this.errorHandler.emit(err, 'Obtaining console URL'),
      })
    );
  }

  getBackwardMode(): boolean {
    return this.backwardMode;
  }

  private setActiveLevel(level: Level) {
    this.activeLevelSubject$.next(level);
  }

  private setBacktrackedLevel(level: Level) {
    this.backtrackedLevelSubject$.next(level);
  }

  private callApiToNextLevel(): Observable<Level> {
    return this.api.nextLevel(this.trainingRunId).pipe(
      tap(
        (level) => {
          this.isCurrentLevelAnsweredSubject$.next(false);
          this.setActiveLevel(level);
        },
        (err) => this.errorHandler.emit(err, 'Moving to next level')
      )
    );
  }

  private callApiToFinish(): Observable<any> {
    const dialog = this.displayLoadingDialog();
    return this.api.finish(this.trainingRunId).pipe(
      tap({
        error: (err) => this.errorHandler.emit(err, 'Finishing training'),
      }),
      switchMap(() => {
        const tmpTrainingRunId = this.trainingRunId;
        setTimeout(() => {
          dialog.close();
          this.router.navigate([this.navigator.toTrainingRunResult(tmpTrainingRunId)]);
        }, 5000);
        return EMPTY;
      }),
      tap(() => this.clear())
    );
  }

  private displayLoadingDialog(): MatDialogRef<LoadingDialogComponent> {
    return this.dialog.open(LoadingDialogComponent, {
      data: new LoadingDialogConfig(
        'Processing training data for visualization',
        `Please wait while your training data are being processed`
      ),
    });
  }
}
