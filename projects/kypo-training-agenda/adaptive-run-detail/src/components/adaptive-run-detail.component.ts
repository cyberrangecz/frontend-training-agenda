import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Phase } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { AdaptiveRunStepper } from '../model/adaptive-run-stepper';
import { SentinelUser } from '@sentinel/layout';
import { SentinelAuthService } from '@sentinel/auth';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { RunningAdaptiveRunService } from '../services/adaptive-run/running/running-adaptive-run.service';

@Component({
  selector: 'kypo-adaptive-training-run-detail',
  templateUrl: './adaptive-run-detail.component.html',
  styleUrls: ['./adaptive-run-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main component of trainees training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class AdaptiveRunDetailComponent extends SentinelBaseDirective implements OnInit, AfterViewInit {
  user$: Observable<SentinelUser>;
  activePhase$: Observable<Phase>;
  backtrackedPhase$: Observable<Phase>;
  phases: Phase[];
  stepper: AdaptiveRunStepper;

  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  isLoading = false;
  sandboxInstanceId: number;
  sandboxDefinitionId: number;
  localEnvironment: boolean;
  backwardMode: boolean;

  constructor(private trainingRunService: RunningAdaptiveRunService, private auth: SentinelAuthService) {
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
    this.phases = this.trainingRunService.getPhases();
    this.startTime = this.trainingRunService.getStartTime();
    this.isTimerDisplayed = true;
    this.isStepperDisplayed = this.trainingRunService.getIsStepperDisplayed();
    this.sandboxInstanceId = this.trainingRunService.sandboxInstanceId;
    this.sandboxDefinitionId = this.trainingRunService.sandboxDefinitionId;
    this.backwardMode = this.trainingRunService.getBackwardMode();
    this.localEnvironment = this.trainingRunService.localEnvironment;
    if (this.isStepperDisplayed) {
      const stepperAdapterPhases = this.phases.map((phase) => new PhaseStepperAdapter(phase));
      this.stepper = new AdaptiveRunStepper(stepperAdapterPhases, this.trainingRunService.getActivePhasePosition());
    }

    this.activePhase$ = this.trainingRunService.activePhase$.pipe(
      takeWhile(() => this.isAlive),
      tap(() => {
        this.isLast = this.trainingRunService.isLast();
        if (this.isStepperDisplayed) {
          this.stepper.onActivePhaseUpdated(this.trainingRunService.getActivePhasePosition());
        }
      })
    );
    this.backtrackedPhase$ = this.trainingRunService.backtrackedPhase$;
  }

  /**
   * Jump to training run level. This only works for training run in preview mode.
   * @param index of desired level
   */
  activeStepChanged(index: number): void {
    if (this.stepper.activePhaseIndex !== index) {
      this.trainingRunService.moveToPhase(this.phases[index].id).pipe(take(1)).subscribe();
      this.stepper.onActivePhaseUpdated(index);
    }
  }

  next(): void {
    this.isLoading = true;
    this.trainingRunService
      .next()
      .pipe(take(1))
      .subscribe(() => (this.isLoading = false));
  }
}
