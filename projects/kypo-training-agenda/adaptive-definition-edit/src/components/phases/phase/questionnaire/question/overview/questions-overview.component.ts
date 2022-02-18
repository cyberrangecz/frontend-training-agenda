import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdaptiveQuestion, QuestionTypeEnum } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { AdaptiveQuestionStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { SentinelStepper } from '@sentinel/components/stepper';
import {
  SentinelControlItem,
  SentinelControlMenuItem,
  SentinelExpandableControlItem,
} from '@sentinel/components/controls';
import { defer, of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { QuestionChangeEvent } from '../../../../../../model/events/question-change-event';
import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';

@Component({
  selector: 'kypo-adaptive-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css'],
})
export class QuestionsOverviewComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() questions: AdaptiveQuestion[];
  @Input() questionnaireOrder: number;
  @Input() questionnaireType: QuestionTypeEnum;
  @Output() deleteRelationChange: EventEmitter<number> = new EventEmitter();
  @Output() questionsChange: EventEmitter<AdaptiveQuestion[]> = new EventEmitter();

  stepperQuestions: SentinelStepper<AdaptiveQuestionStepperAdapter> = { items: [] };
  controls: SentinelControlItem[];
  questionsHasError: boolean;
  selectedStep: number;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.selectedStep = 0;
    this.initControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['questionnaireOrder'] &&
      changes['questionnaireOrder'].previousValue !== changes['questionnaireOrder'].currentValue
    ) {
      this.selectedStep = 0;
    }
    if ('questions' in changes && changes['questions'].isFirstChange()) {
      this.selectedStep = 0;
    }
    if ('questions' in changes && this.questions) {
      this.stepperQuestions.items = this.questions.map((question) => new AdaptiveQuestionStepperAdapter(question));
      this.calculateHasError();
    }
    if (this.stepperQuestions.items.length > 0) {
      this.stepperQuestions.items[this.selectedStep].isActive = true;
    }
  }

  addQuestion(type: QuestionTypeEnum): void {
    if (this.stepperQuestions.items.length >= 1) {
      this.stepperQuestions.items[this.selectedStep].isActive = false;
    }
    const newQuestion = new AdaptiveQuestion();
    newQuestion.questionType = type;
    newQuestion.choices = [];
    newQuestion.text = 'Question text?';
    newQuestion.order = this.stepperQuestions.items.length + 1;
    const questionStepperAdapter = new AdaptiveQuestionStepperAdapter(newQuestion);
    questionStepperAdapter.isActive = true;
    this.stepperQuestions.items.push(questionStepperAdapter);
    this.selectedStep = this.stepperQuestions.items.length - 1;
    this.onQuestionChanged();
  }

  deleteActiveQuestion(): void {
    const question = this.stepperQuestions.items[this.selectedStep];
    let dialogRef;
    if (question.relations > 0) {
      dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
        data: new SentinelConfirmationDialogConfig(
          'Question in Relation',
          `Cannot delete question "${question.title}" with existing relation.
           Remove Question from relation(s) and delete in afterwards.`,
          'Cancel'
        ),
      });
    } else {
      dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
        data: new SentinelConfirmationDialogConfig(
          'Delete Question',
          `Do you want to delete question "${question.title}"?`,
          'Cancel',
          'Delete'
        ),
      });
    }

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        if (result === SentinelDialogResultEnum.CONFIRMED) {
          this.deleteRelationChange.emit(this.selectedStep);
          this.stepperQuestions.items.splice(this.selectedStep, 1);
          this.stepperQuestions.items.forEach((question, index) => (question.order = index));
          this.changeSelectedStepAfterRemoving(this.selectedStep);
          this.onQuestionChanged();
        }
      });
  }

  /**
   * Triggered after selection of active question is changed in the stepper
   * @param index index of active question
   */
  onActiveQuestionChanged(index: number): void {
    if (index !== this.selectedStep && this.stepperQuestions.items.length > 0) {
      this.stepperQuestions.items[this.selectedStep].isActive = false;
      this.selectedStep = index;
    }
  }

  /**
   * Updates order of stepper items to match order of the questions
   */
  onOrderUpdate(): void {
    this.stepperQuestions.items.forEach((question, index) => {
      this.stepperQuestions.items[index].question.order = index;
    });
    this.onQuestionChanged();
  }

  /**
   * Changes internal state of the component and emits event to parent component
   * @param event question change state event
   */
  onQuestionChanged(event: QuestionChangeEvent = null): void {
    this.calculateHasError();
    if (event && event.question) {
      this.stepperQuestions.items[this.selectedStep].question = event.question;
    }
    this.questionsChange.emit(this.stepperQuestions.items.map((item) => item.question));
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  private calculateHasError() {
    this.questionsHasError = this.stepperQuestions.items.some((question) => !question.valid);
  }

  /**
   * Changes selected step to the one before removed or to first one if the first step is removed
   * @param {number} index index of the removed step
   */
  private changeSelectedStepAfterRemoving(index: number) {
    if (index === 0) {
      this.selectedStep = 0;
    } else {
      this.selectedStep--;
    }
    this.onActiveQuestionChanged(this.stepperQuestions.items.length - 1);
    if (this.stepperQuestions.items.length > 0) {
      this.stepperQuestions.items[this.stepperQuestions.items.length - 1].isActive = true;
    }
  }

  private initControls(): void {
    this.controls = [
      new SentinelExpandableControlItem('add_question', 'Add Question', 'primary', of(false), [
        new SentinelControlMenuItem(
          'add_ffq ',
          'Free Form',
          'primary',
          of(false),
          defer(() => this.addQuestion(QuestionTypeEnum.FFQ)),
          'edit'
        ),
        new SentinelControlMenuItem(
          'add_mcq',
          'Multiple Choice',
          'primary',
          of(false),
          defer(() => this.addQuestion(QuestionTypeEnum.MCQ)),
          'check_circle_outline'
        ),
        new SentinelControlMenuItem(
          'add_mcq',
          'Rating Form',
          'primary',
          of(false),
          defer(() => this.addQuestion(QuestionTypeEnum.RFQ)),
          'star_half'
        ),
      ]),
      new SentinelControlItem(
        'delete',
        'Delete',
        'warn',
        of(false),
        //deleteDisabled$,
        //this.deleteDisabledSubject$.asObservable(),
        defer(() => this.deleteActiveQuestion())
      ),
    ];
  }
}
