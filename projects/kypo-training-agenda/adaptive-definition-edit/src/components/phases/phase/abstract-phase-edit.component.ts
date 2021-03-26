import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { AbstractPhaseTypeEnum, Phase, TrainingPhase } from '@muni-kypo-crp/training-model';

/**
 * Main component of phases edit. Resolves which component should be display based on phases type
 */
@Component({
  selector: 'kypo-phase-edit',
  templateUrl: './abstract-phase-edit.component.html',
  styleUrls: ['./abstract-phase-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractPhaseEditComponent extends SentinelBaseDirective {
  @Input() phase: Phase;
  @Input() updateMatrix$: Observable<boolean>;
  @Input() presentTrainingPhases$: Observable<TrainingPhase[]>;
  @Output() phaseChange: EventEmitter<Phase> = new EventEmitter();
  phaseTypes = AbstractPhaseTypeEnum;

  onPhaseChange(phase: Phase): void {
    this.phaseChange.emit(phase);
  }
}
