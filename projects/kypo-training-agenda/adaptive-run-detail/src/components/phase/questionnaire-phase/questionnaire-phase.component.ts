import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
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
  @ViewChild('controls', { read: ElementRef, static: true }) controlsPanel: ElementRef;

  isSubmitted = false;
  isLoading = false;
  questionAnswers: QuestionAnswer[] = [];
  questionTypes = QuestionTypeEnum;

  ngOnChanges(changes: SimpleChanges): void {
    if ('phase' in changes) {
      this.initEmptyAnswers();
      this.isSubmitted = false;
    }
  }

  ngOnInit(): void {
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

  onFFQChanged(event, questionIndex: number): void {
    console.log(event);
  }

  onMCQChecked(event, questionIndex: number, answer: string): void {
    if (event.checked) {
      this.questionAnswers[questionIndex].answers.push(answer);
    } else {
      this.questionAnswers[questionIndex].answers = this.questionAnswers[questionIndex].answers.filter(
        (a) => a !== answer
      );
    }
  }

  onRFQChecked(event, questionIndex: number, answer: string): void {
    if (event.checked) {
      this.questionAnswers[questionIndex].answers[0] = answer;
    } else {
      this.questionAnswers[questionIndex].answers = [];
    }
  }

  submit(): void {
    this.isLoading = true;
    this.runningAdaptiveRunService
      .submitQuestionnaire(this.questionAnswers)
      .pipe(take(1))
      .subscribe(() => {
        this.isSubmitted = true;
        this.isLoading = false;
      });
  }

  // Workaround since position:sticky is not working due to overflow in mat-content
  getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }
}
