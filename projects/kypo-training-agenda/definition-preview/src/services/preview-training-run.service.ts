import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '@muni-kypo-crp/training-model';
import { AccessTrainingRunInfo } from '@muni-kypo-crp/training-model';
import { from, Observable, of } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { RunningTrainingRunService } from '@muni-kypo-crp/training-agenda/internal';

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

  init(trainingRunInfo: AccessTrainingRunInfo) {
    this.levels = trainingRunInfo.levels;
    this.isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this.activeLevelIndex = 0;
    const firstLevel = this.levels[this.activeLevelIndex];
    this.activeLevelSubject$.next(firstLevel);
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

  next(): Observable<any> {
    return this.isLast() ? this.finish() : this.nextLevel();
  }

  isLast(): boolean {
    return this.activeLevelIndex >= this.levels.length - 1;
  }

  clear() {
    this.levels = [];
    this.activeLevelIndex = 0;
  }

  private nextLevel(): Observable<any> {
    this.activeLevelIndex++;
    const nextLevel = this.levels[this.activeLevelIndex];
    this.activeLevelSubject$.next(nextLevel);
    return of(true);
  }

  private finish(): Observable<any> {
    this.clear();
    return from(this.router.navigate([this.navigator.toTrainingDefinitionOverview()]));
  }
}
