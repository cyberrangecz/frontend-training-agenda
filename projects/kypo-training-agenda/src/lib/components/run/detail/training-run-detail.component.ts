import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Level } from 'kypo-training-model';
import { Kypo2AuthService, User } from 'kypo2-auth';
import { Observable } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { LevelStepperAdapter } from '../../../model/adapters/stepper/level-stepper-adapter';
import { TrainingRunStepper } from '../../../model/adapters/stepper/training-run-stepper';
import { RunningTrainingRunService } from '../../../services/training-run/running/running-training-run.service';

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
  user$: Observable<User>;
  activeLevel$: Observable<Level>;
  levels: Level[];
  stepper: TrainingRunStepper;

  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  sandboxId: number;

  constructor(private trainingRunService: RunningTrainingRunService, private auth: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.user$ = this.auth.activeUser$;
    this.levels = this.trainingRunService.getLevels();
    this.startTime = this.trainingRunService.getStartTime();
    this.isTimerDisplayed = true;
    this.isStepperDisplayed = this.trainingRunService.getIsStepperDisplayed();
    this.sandboxId = this.trainingRunService.sandboxInstanceId;
    if (this.isStepperDisplayed) {
      const stepperAdapterLevels = this.levels.map((level) => new LevelStepperAdapter(level));
      this.stepper = new TrainingRunStepper(stepperAdapterLevels, this.trainingRunService.getActiveLevelPosition());
    }

    this.activeLevel$ = this.trainingRunService.activeLevel$.pipe(
      takeWhile(() => this.isAlive),
      tap((_) => {
        this.isLast = this.trainingRunService.isLast();
        if (this.isStepperDisplayed) {
          this.stepper.onActiveLevelUpdated(this.trainingRunService.getActiveLevelPosition());
        }
      })
    );
  }

  next() {
    this.trainingRunService.next().pipe(take(1)).subscribe();
  }
}
