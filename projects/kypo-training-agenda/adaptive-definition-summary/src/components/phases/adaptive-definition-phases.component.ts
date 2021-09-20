import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractPhaseTypeEnum,
  InfoPhase,
  Phase,
  QuestionnairePhase,
  QuestionnaireTypeEnum,
} from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { PhaseDetailExpandControls } from '../../model/phase-detail-expand-controls';
import { takeWhile } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'kypo-adaptive-definition-phases',
  templateUrl: './adaptive-definition-phases.component.html',
  styleUrls: ['./adaptive-definition-phases.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveDefinitionPhasesDetailComponent extends SentinelBaseDirective implements OnInit {
  @Input() phases: Phase[];

  @ViewChild(MatAccordion) accordion: MatAccordion;

  controls: SentinelControlItem[];

  ngOnInit(): void {
    this.controls = PhaseDetailExpandControls.create();
  }

  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
      res === 'expand' ? this.accordion.openAll() : this.accordion.closeAll();
    });
  }

  getInfoPhases(): Phase[] {
    return this.phases.filter((phase: InfoPhase) => phase.type === AbstractPhaseTypeEnum.Info);
  }

  getTrainingPhases(): Phase[] {
    return this.phases.filter((phase) => phase.type === AbstractPhaseTypeEnum.Training);
  }

  getAdaptiveQuestionnaires(): Phase[] {
    return this.phases.filter(
      (phase: QuestionnairePhase) =>
        phase.type === AbstractPhaseTypeEnum.Questionnaire && phase.questionnaireType === QuestionnaireTypeEnum.Adaptive
    );
  }

  getGeneralQuestionnaires(): Phase[] {
    return this.phases.filter(
      (phase: QuestionnairePhase) =>
        phase.type === AbstractPhaseTypeEnum.Questionnaire && phase.questionnaireType === QuestionnaireTypeEnum.General
    );
  }
}
