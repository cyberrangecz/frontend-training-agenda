import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Phase } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { take, takeWhile, tap } from 'rxjs/operators';
import { AdaptiveRunStepper } from '../model/adaptive-run-stepper';
import { SentinelUser } from '@sentinel/layout';
import { SentinelAuthService } from '@sentinel/auth';
import { RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';

@Component({
  selector: 'kypo-training-run-detail',
  templateUrl: './adaptive-run-detail.component.html',
  styleUrls: ['./adaptive-run-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main component of trainees training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class AdaptiveRunDetailComponent extends SentinelBaseDirective implements OnInit {
  user$: Observable<SentinelUser>;
  activePhase$: Observable<Phase>;
  phases: Phase[];
  stepper: AdaptiveRunStepper;

  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLast: boolean;
  isLoading = false;
  sandboxId: number;

  constructor(private trainingRunService: RunningAdaptiveRunService, private auth: SentinelAuthService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.user$ = this.auth.activeUser$;
    this.phases = this.trainingRunService.getPhases();
    this.startTime = this.trainingRunService.getStartTime();
    this.isTimerDisplayed = true;
    this.isStepperDisplayed = this.trainingRunService.getIsStepperDisplayed();
    this.sandboxId = this.trainingRunService.sandboxInstanceId;
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
  }

  next(): void {
    this.isLoading = true;
    this.trainingRunService
      .next()
      .pipe(take(1))
      .subscribe((_) => (this.isLoading = false));
  }
}
