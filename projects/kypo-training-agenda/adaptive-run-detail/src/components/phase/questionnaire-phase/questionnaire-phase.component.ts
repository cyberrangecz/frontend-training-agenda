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
import { SentinelBaseDirective } from '@sentinel/common';
import { take } from 'rxjs/operators';
import { QuestionAnswer, QuestionnairePhase, QuestionTypeEnum } from '@muni-kypo-crp/training-model';
import { RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';

@Component({
  selector: 'kypo-questionnaire-phase',
  templateUrl: './questionnaire-phase.component.html',
  styleUrls: ['./questionnaire-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnairePhaseComponent extends SentinelBaseDirective implements OnChanges, OnInit {
  @Input() phase: QuestionnairePhase;
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  isSubmitted = false;
  isLoading = false;
  questionAnswers: QuestionAnswer[] = [];
  questionTypes = QuestionTypeEnum;

  ngOnChanges(changes: SimpleChanges) {
    if ('phase' in changes) {
      this.initEmptyAnswers();
      this.isSubmitted = false;
    }
  }

  ngOnInit() {
    this.initEmptyAnswers();
    this.isSubmitted = false;
  }

  private initEmptyAnswers() {
    this.questionAnswers = [];
    this.phase.questions.forEach((question) => {
      const answers = new QuestionAnswer();
      answers.questionId = question.id;
      answers.answers = [];
      this.questionAnswers.push(answers);
    });
  }

  constructor(private runningAdaptiveRunService: RunningAdaptiveRunService) {
    super();
  }

  onNext(): void {
    this.next.emit();
  }

  onFFQChanged(event, questionIndex: number) {
    console.log(event);
  }

  onMCQChecked(event, questionIndex: number, answer: string) {
    if (event.checked) {
      this.questionAnswers[questionIndex].answers.push(answer);
    } else {
      this.questionAnswers[questionIndex].answers = this.questionAnswers[questionIndex].answers.filter(
        (a) => a !== answer
      );
    }
  }

  onRFQChecked(event, questionIndex: number, answer: string) {
    if (event.checked) {
      this.questionAnswers[questionIndex].answers[0] = answer;
    } else {
      this.questionAnswers[questionIndex].answers = [];
    }
  }

  submit() {
    this.isLoading = true;
    this.runningAdaptiveRunService
      .submitQuestionnaire(this.questionAnswers)
      .pipe(take(1))
      .subscribe(() => {
        this.isSubmitted = true;
        this.isLoading = false;
      });
  }
}
