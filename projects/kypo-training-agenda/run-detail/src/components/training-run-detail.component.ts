import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Level } from '@muni-kypo-crp/training-model';
import { Observable, of } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { LevelStepperAdapter, RunningTrainingRunService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingRunStepper } from '../model/training-run-stepper';
import { SentinelUser } from '@sentinel/layout';
import { SentinelAuthService } from '@sentinel/auth';

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
export class TrainingRunDetailComponent extends SentinelBaseDirective implements OnInit {
  user$: Observable<SentinelUser>;
  activeLevel$: Observable<Level>;
  levels: Level[];
  stepper: TrainingRunStepper;

  isStepperDisplayed: boolean;
  isPreview: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  sandboxId: number;

  constructor(private trainingRunService: RunningTrainingRunService, private auth: SentinelAuthService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.user$ = this.auth.activeUser$;
    this.levels = this.trainingRunService.getLevels();
    this.startTime = this.trainingRunService.getStartTime();
    this.isTimerDisplayed = true;
    this.isStepperDisplayed = this.trainingRunService.getIsStepperDisplayed();
    this.isPreview = this.trainingRunService.getIsPreview();
    this.sandboxId = this.trainingRunService.sandboxInstanceId;
    if (this.isStepperDisplayed || this.isPreview) {
      const stepperAdapterLevels = this.levels.map((level) => new LevelStepperAdapter(level));
      this.stepper = new TrainingRunStepper(stepperAdapterLevels, this.trainingRunService.getActiveLevelPosition());
    }

    this.activeLevel$ = this.trainingRunService.activeLevel$.pipe(
      takeWhile(() => this.isAlive),
      tap(() => {
        this.isLast = this.trainingRunService.isLast();
        if (this.isStepperDisplayed || this.isPreview) {
          this.stepper.onActiveLevelUpdated(this.trainingRunService.getActiveLevelPosition());
        }
      })
    );
  }

  /**
   * Jump to training run level. This only works for training run in preview mode.
   * @param index of desired level
   */
  activeStepChanged(index: number): void {
    if (this.isPreview) {
      this.stepper.activeLevelIndex = index;
      this.trainingRunService.setActiveLevelIndex(index);
      this.activeLevel$ = of(this.levels[index]);
    }
  }

  next(): void {
    if (this.isPreview) {
      this.stepper.items[this.stepper.activeLevelIndex].isActive = false;
      this.activeStepChanged(++this.stepper.activeLevelIndex);
      this.stepper.items[this.stepper.activeLevelIndex].isActive = true;
    } else {
      this.trainingRunService.next().pipe(take(1)).subscribe();
    }
  }
}
