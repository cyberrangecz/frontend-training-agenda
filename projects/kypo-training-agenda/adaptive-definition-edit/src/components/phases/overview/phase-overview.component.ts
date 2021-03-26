import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { Phase, TrainingDefinition, TrainingPhase } from '@muni-kypo-crp/training-model';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { PhaseEditService } from '../../../services/state/phase/phase-edit.service';
import { PhaseMoveEvent } from '../../../model/events/phase-move-event';
import { PhaseOverviewControls } from '../../../model/adapters/phase-overview-controls';

/**
 * Smart component for phases stepper and phases edit components
 */
@Component({
  selector: 'kypo-phase-overview',
  templateUrl: './phase-overview.component.html',
  styleUrls: ['./phase-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhaseOverviewComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Output() unsavedPhases: EventEmitter<Phase[]> = new EventEmitter();
  @Output() phasesCount: EventEmitter<number> = new EventEmitter();
  @Input() trainingDefinition: TrainingDefinition;

  activeStep$: Observable<number>;
  stepperPhases: Observable<PhaseStepperAdapter[]>;
  controls: SentinelControlItem[];
  phaseMovingInProgress: boolean;
  updateMatrix$: Observable<boolean>;
  updateQuestionsFlag$: Observable<boolean>;
  presentTrainingPhases$: Observable<TrainingPhase[]>;

  constructor(private dialog: MatDialog, private phaseService: PhaseEditService) {
    super();
  }

  ngOnInit(): void {
    this.activeStep$ = this.phaseService.activeStep$;
    this.stepperPhases = this.phaseService.phases$.pipe(
      map((phases) => phases.map((phase) => new PhaseStepperAdapter(phase))),
      tap(() => this.phasesCount.emit(this.phaseService.getPhasesCount()))
    );

    this.updateMatrix$ = this.phaseService.updateMatrix$;
    this.updateQuestionsFlag$ = this.phaseService.updateQuestionsFlag$;
    this.presentTrainingPhases$ = this.phaseService.presentTrainingPhases$;

    this.phaseService.unsavedPhases$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((unsavedLevels) => this.unsavedPhases.emit(unsavedLevels));
    this.initControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingDefinition' in changes) {
      this.phaseService.set(this.trainingDefinition.id, this.trainingDefinition.levels as Phase[]);
    }
  }

  /**
   * Calls service to set new active phases
   * @param phaseIndex index of new active phases
   */
  onActivePhaseChange(phaseIndex: number): void {
    this.phaseService.setActivePhase(phaseIndex);
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  /**
   * Call service to move phases from original position to a new one
   * @param event event of phases move
   */
  onPhaseMoved(event: PhaseMoveEvent): void {
    this.phaseMovingInProgress = true;
    this.phaseService.move(event.stepperState.previousIndex, event.stepperState.currentIndex);
    this.phaseMovingInProgress = false;
  }

  onActivePhaseChanged(phase: Phase): void {
    this.phaseService.onActivePhaseChanged(phase);
  }

  private initControl(): void {
    const saveDisabled$ = this.phaseService.activePhaseCanBeSaved$.pipe(map((canBeSaved) => !canBeSaved));
    const deleteDisabled$ = this.phaseService.phases$.pipe(map((phases) => phases.length <= 0));
    this.controls = PhaseOverviewControls.create(this.phaseService, saveDisabled$, deleteDisabled$);
  }
}
