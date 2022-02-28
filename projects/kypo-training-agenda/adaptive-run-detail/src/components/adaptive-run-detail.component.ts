import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Phase } from '@muni-kypo-crp/training-model';
import { Observable, of } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { AdaptiveRunStepper } from '../model/adaptive-run-stepper';
import { SentinelUser } from '@sentinel/layout';
import { SentinelAuthService } from '@sentinel/auth';
import { RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';

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
  phases: Phase[];
  stepper: AdaptiveRunStepper;

  isStepperDisplayed: boolean;
  isPreview: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  isLoading = false;
  sandboxInstanceId: number;
  sandboxDefinitionId: number;
  localEnvironment: boolean;

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
    this.isPreview = this.trainingRunService.getIsPreview();
    this.sandboxInstanceId = this.trainingRunService.sandboxInstanceId;
    this.sandboxDefinitionId = this.trainingRunService.sandboxDefinitionId;
    this.localEnvironment = this.trainingRunService.localEnvironment;
    if (this.isStepperDisplayed || this.isPreview) {
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
  }

  /**
   * Jump to training run level. This only works for training run in preview mode.
   * @param index of desired level
   */
  activeStepChanged(index: number): void {
    if (this.isPreview) {
      this.stepper.activePhaseIndex = index;
      this.trainingRunService.setActivePhaseIndex(index);
      this.activePhase$ = of(this.phases[index]);
    }
  }

  next(): void {
    if (this.isPreview) {
      this.stepper.items[this.stepper.activePhaseIndex].isActive = false;
      this.activeStepChanged(++this.stepper.activePhaseIndex);
      this.stepper.items[this.stepper.activePhaseIndex].isActive = true;
    }
    this.isLoading = true;
    this.trainingRunService
      .next()
      .pipe(take(1))
      .subscribe(() => (this.isLoading = false));
  }
}
