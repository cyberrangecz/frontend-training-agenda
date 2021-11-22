import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '@muni-kypo-crp/training-model';
import { AccessTrainingRunInfo } from '@muni-kypo-crp/training-model';
import { from, Observable, of } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { RunningTrainingRunService } from '@muni-kypo-crp/training-agenda/internal';
import { ConsoleUrl } from '@muni-kypo-crp/topology-graph';

@Injectable()
/**
 * Mocks behavior of training run service connected to backend for designers preview purposes
 */
export class PreviewTrainingRunService extends RunningTrainingRunService {
  constructor(private router: Router, private navigator: TrainingNavigator) {
    super();
  }

  private levels: Level[] = [];
  private activeLevelIndex: number;
  private isStepperDisplayed: boolean;
  private isPreview: boolean;

  init(trainingRunInfo: AccessTrainingRunInfo): void {
    this.levels = trainingRunInfo.levels as Level[];
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.isPreview = trainingRunInfo.isPreview;
    this.activeLevelIndex = 0;
    const firstLevel = this.levels[this.activeLevelIndex];
    this.activeLevelSubject$.next(firstLevel as Level);
  }

  setActiveLevelIndex(index: number): void {
    this.activeLevelIndex = index;
  }

  getLevels(): Level[] {
    return this.levels;
  }

  getActiveLevel(): Level {
    return this.levels[this.activeLevelIndex];
  }

  getActiveLevelPosition(): number {
    return this.activeLevelIndex;
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
    return this.isLast() ? this.finish() : this.nextLevel();
  }

  isLast(): boolean {
    return this.activeLevelIndex >= this.levels.length - 1;
  }

  clear(): void {
    this.levels = [];
    this.activeLevelIndex = 0;
  }

  loadConsoles(sandboxId: number): Observable<ConsoleUrl[]> {
    return of([]);
  }

  private nextLevel(): Observable<any> {
    this.activeLevelIndex++;
    const nextLevel = this.levels[this.activeLevelIndex];
    this.activeLevelSubject$.next(nextLevel as Level);
    return of(true);
  }

  private finish(): Observable<any> {
    this.clear();
    return from(this.router.navigate([this.navigator.toTrainingDefinitionOverview()]));
  }
}
