import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractPhaseTypeEnum,
  AccessTrainingRunInfo,
  Phase,
  QuestionAnswer,
  TrainingPhase,
} from '@muni-kypo-crp/training-model';
import { EMPTY, from, Observable, of } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';
import { ConsoleUrl } from '@muni-kypo-crp/topology-graph';

@Injectable()
/**
 * Mocks behavior of training run service connected to backend for designers preview purposes
 */
export class AdaptivePreviewTrainingRunService extends RunningAdaptiveRunService {
  constructor(private router: Router, private navigator: TrainingNavigator) {
    super();
  }

  private phases: Phase[] = [];
  private activePhaseIndex: number;
  private isStepperDisplayed: boolean;
  private isPreview: boolean;

  init(trainingRunInfo: AccessTrainingRunInfo): void {
    this.phases = trainingRunInfo.levels as Phase[];
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.isPreview = trainingRunInfo.isPreview;
    this.activePhaseIndex = 0;
    this.setCurrentTasks();
    const firstLevel = this.phases[this.activePhaseIndex];
    this.activePhaseSubject$.next(firstLevel as Phase);
  }

  setActivePhaseIndex(index: number): void {
    this.activePhaseIndex = index;
  }

  getPhases(): Phase[] {
    return this.phases;
  }

  getActivePhase(): Phase {
    return this.phases[this.activePhaseIndex];
  }

  getActivePhasePosition(): number {
    return this.activePhaseIndex;
  }

  getStartTime(): Date {
    return new Date();
  }

  getIsStepperDisplayed(): boolean {
    return this.isStepperDisplayed;
  }

  getIsPreview(): boolean {
    return this.isPreview;
  }

  next(): Observable<any> {
    return this.isLast() ? this.finish() : this.nextPhase();
  }

  isLast(): boolean {
    return this.activePhaseIndex >= this.phases.length - 1;
  }

  clear(): void {
    this.phases = [];
    this.activePhaseIndex = 0;
  }

  loadConsoles(sandboxId: number): Observable<ConsoleUrl[]> {
    return of([]);
  }

  submitQuestionnaire(answers: QuestionAnswer[]): Observable<any> {
    return EMPTY;
  }

  /**
   * For preview mode set first task as current task. This is needed because currentTask is being set based on trainees'
   * performance therefore it has to be set manually.
   * @private
   */
  private setCurrentTasks() {
    this.phases.forEach((phase, index) => {
      if (phase.type === AbstractPhaseTypeEnum.Training) {
        const trainingPhase = phase as TrainingPhase;
        trainingPhase.currentTask = trainingPhase.tasks[0];
        this.phases[index] = trainingPhase;
      }
    });
  }

  private nextPhase(): Observable<any> {
    this.activePhaseIndex++;
    const nextPhase = this.phases[this.activePhaseIndex];
    this.activePhaseSubject$.next(nextPhase as Phase);
    return of(true);
  }

  private finish(): Observable<boolean> {
    this.clear();
    return from(this.router.navigate([this.navigator.toAdaptiveDefinitionOverview()]));
  }
}
