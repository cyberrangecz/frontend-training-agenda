import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Level } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { LevelStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunStepper } from '../model/training-run-stepper';
import { SentinelUser } from '@sentinel/layout';
import { SentinelAuthService } from '@sentinel/auth';
import { RunningTrainingRunService } from '../services/training-run/running/running-training-run.service';

@Component({
  selector: 'kypo-training-run-detail',
  templateUrl: './training-run-detail.component.html',
  styleUrls: ['./training-run-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main component of trainees training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class TrainingRunDetailComponent extends SentinelBaseDirective implements OnInit, AfterViewInit {
  user$: Observable<SentinelUser>;
  activeLevel$: Observable<Level>;
  backtrackedLevel$: Observable<Level>;
  levels: Level[];
  stepper: TrainingRunStepper;

  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  sandboxInstanceId: number;
  sandboxDefinitionId: number;
  localEnvironment: boolean;
  backwardMode: boolean;

  constructor(private trainingRunService: RunningTrainingRunService, private auth: SentinelAuthService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    if (!this.localEnvironment) {
      this.trainingRunService.loadConsoles(this.sandboxInstanceId).pipe(take(1)).subscribe();
    }
  }

  private init() {
    this.user$ = this.auth.activeUser$;
    this.levels = this.trainingRunService.getLevels();
    this.startTime = this.trainingRunService.getStartTime();
    this.isTimerDisplayed = true;
    this.isStepperDisplayed = this.trainingRunService.getIsStepperDisplayed();
    this.sandboxInstanceId = this.trainingRunService.sandboxInstanceId;
    this.sandboxDefinitionId = this.trainingRunService.sandboxDefinitionId;
    this.localEnvironment = this.trainingRunService.localEnvironment;
    this.backwardMode = this.trainingRunService.getBackwardMode();
    if (this.isStepperDisplayed) {
      const stepperAdapterLevels = this.levels.map((level) => new LevelStepperAdapter(level));
      this.stepper = new TrainingRunStepper(stepperAdapterLevels, this.trainingRunService.getActiveLevelPosition());
    }
    this.activeLevel$ = this.trainingRunService.activeLevel$.pipe(
      takeWhile(() => this.isAlive),
      tap(() => {
        this.isLast = this.trainingRunService.isLast();
        if (this.isStepperDisplayed) {
          this.stepper.onActiveLevelUpdated(this.trainingRunService.getActiveLevelPosition());
        }
      })
    );
    this.backtrackedLevel$ = this.trainingRunService.backtrackedLevel$;
  }

  /**
   * Jump to training run level.
   * @param index of desired level
   */
  activeStepChanged(index: number): void {
    if (this.stepper.activeLevelIndex !== index) {
      this.trainingRunService.moveToLevel(this.levels[index].id).pipe(take(1)).subscribe();
      this.stepper.onActiveLevelUpdated(index);
    }
  }

  next(): void {
    this.trainingRunService.next().pipe(take(1)).subscribe();
  }
}
