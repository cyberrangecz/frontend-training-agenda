import { Injectable } from '@angular/core';
import { RunningAdaptiveRunService } from './running-adaptive-run.service';
import { from, Observable } from 'rxjs';
import { AbstractPhaseTypeEnum, AccessTrainingRunInfo, Phase, QuestionAnswer } from '@muni-kypo-crp/training-model';
import { AdaptiveRunApi } from '@muni-kypo-crp/training-api';
import { Router } from '@angular/router';
import { TrainingErrorHandler, TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { switchMap, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SentinelConfirmationDialogComponent, SentinelConfirmationDialogConfig } from '@sentinel/components/dialogs';

@Injectable()
export class RunningAdaptiveRunConcreteService extends RunningAdaptiveRunService {
  private activePhases: Phase[] = [];
  private startTime: Date;
  private isStepperDisplayed: boolean;

  constructor(
    private api: AdaptiveRunApi,
    private errorHandler: TrainingErrorHandler,
    private navigator: TrainingNavigator,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

  init(accessAdaptiveRunInfo: AccessTrainingRunInfo): void {
    this.trainingRunId = accessAdaptiveRunInfo.trainingRunId;
    this.sandboxInstanceId = accessAdaptiveRunInfo.sandboxInstanceId;
    this.isStepperDisplayed = accessAdaptiveRunInfo.isStepperDisplayed;
    this.startTime = accessAdaptiveRunInfo.startTime;
    this.activePhases = accessAdaptiveRunInfo.levels as Phase[];
    this.setActivePhase(accessAdaptiveRunInfo.currentLevel as Phase);
  }

  getPhases(): Phase[] {
    return this.activePhases;
  }

  getActivePhasePosition(): number {
    return this.activePhases.findIndex((phase) => phase.id === this.getActivePhase().id);
  }

  getActivePhase(): Phase {
    return this.activePhaseSubject$.getValue();
  }

  getStartTime(): Date {
    return this.startTime;
  }

  getIsStepperDisplayed(): boolean {
    return this.isStepperDisplayed;
  }

  next(): Observable<any> {
    return this.isLast() ? this.callApiToFinish() : this.callApiToNextLevel();
  }

  isLast(): boolean {
    return this.getActivePhase()?.id === this.activePhases[this.activePhases.length - 1].id;
  }

  clear(): void {
    this.trainingRunId = undefined;
    this.sandboxInstanceId = undefined;
    this.startTime = undefined;
    this.activePhaseSubject$.next(undefined);
    this.activePhases = [];
  }

  submitQuestionnaire(answers: QuestionAnswer[]): Observable<any> {
    return this.api.evaluateQuestionnaire(this.trainingRunId, answers).pipe(
      tap(
        (_) => _,
        (err) => this.errorHandler.emit(err, 'Submitting answers')
      ),
      switchMap(() => this.next())
    );
  }

  private setActivePhase(phase: Phase) {
    this.activePhaseSubject$.next(phase);
  }

  private callApiToFinish(): Observable<any> {
    return this.api.finish(this.trainingRunId).pipe(
      tap({ error: (err) => this.errorHandler.emit(err, 'Finishing training') }),
      // temporary because visualizations are not finished
      switchMap(() => from(this.router.navigate([this.navigator.toTrainingRunOverview()]))),
      tap(() => this.clear())
    );
  }

  private callApiToNextLevel(): Observable<Phase> {
    const phaseOrder = this.getActivePhase().order;
    if (this.activePhases[phaseOrder + 1].type === AbstractPhaseTypeEnum.Training) {
      const dialogRef = this.displayDialogToNextTask();
      return this.api.nextPhase(this.trainingRunId).pipe(
        tap(
          (phase) => {
            dialogRef.close();
            this.setActivePhase(phase);
          },
          (err) => {
            dialogRef.close();
            this.errorHandler.emit(err, 'Moving to next phase');
          }
        )
      );
    } else {
      return this.api.nextPhase(this.trainingRunId).pipe(
        tap(
          (phase) => this.setActivePhase(phase),
          (err) => this.errorHandler.emit(err, 'Moving to next phase')
        )
      );
    }
  }

  private displayDialogToNextTask(): MatDialogRef<SentinelConfirmationDialogComponent> {
    return this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Creating a perfect task for you',
        `Please wait while your next task is being prepared`
      ),
    });
  }
}
