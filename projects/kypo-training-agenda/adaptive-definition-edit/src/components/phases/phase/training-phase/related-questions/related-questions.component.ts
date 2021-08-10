import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdaptiveQuestion, Question, QuestionTypeEnum } from '@muni-kypo-crp/training-model';

/**
 * Main hint edit component. Contains stepper to navigate through existing hints and controls to create new hints
 */
@Component({
  selector: 'kypo-related-questions',
  templateUrl: './related-questions.component.html',
  styleUrls: ['./related-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedQuestionsComponent {
  @Input() relatedQuestions: AdaptiveQuestion[];
  questionTypes = QuestionTypeEnum;
}
