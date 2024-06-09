import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionAnswer, QuestionnairePhase, QuestionTypeEnum } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-questionnaire-phase',
  templateUrl: './questionnaire-phase.component.html',
  styleUrls: ['./questionnaire-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnairePhaseComponent {
  @Input() phase: QuestionnairePhase;

  isSubmitted = false;
  isLoading = false;
  questionAnswers: QuestionAnswer[] = [];
  questionTypes = QuestionTypeEnum;
}
