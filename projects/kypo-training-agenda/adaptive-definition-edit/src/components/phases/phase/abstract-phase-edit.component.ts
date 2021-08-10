import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { AbstractPhaseTypeEnum, AdaptiveQuestion, Phase, TrainingPhase } from '@muni-kypo-crp/training-model';
import { PhaseRelation } from '@muni-kypo-crp/training-model/lib/phase/questionnaire-phase/phase-relation';

/**
 * Main component of phases edit. Resolves which component should be display based on phases type
 */
@Component({
  selector: 'kypo-phase-edit',
  templateUrl: './abstract-phase-edit.component.html',
  styleUrls: ['./abstract-phase-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractPhaseEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() phase: Phase;
  @Input() updateMatrix$: Observable<boolean>;
  @Input() presentTrainingPhases$: Observable<TrainingPhase[]>;
  @Input() phaseRelations: PhaseRelation[];
  @Input() questions: Map<number, AdaptiveQuestion>;
  @Output() phaseChange: EventEmitter<Phase> = new EventEmitter();
  phaseTypes = AbstractPhaseTypeEnum;
  relatedQuestions: AdaptiveQuestion[] = [];

  onPhaseChange(phase: Phase): void {
    this.phaseChange.emit(phase);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if ('phase' in changes || 'phaseRelations' in changes) {
      this.relatedQuestions = this.phaseRelations
        .filter((phaseRelation) => phaseRelation.phaseId === this.phase.id)
        .map((phaseRelation) => phaseRelation.questionIds.map((questionId) => this.questions.get(questionId)))
        .reduce((accumulator, value) => accumulator.concat(value), [] as AdaptiveQuestion[]);
    }
  }
}
