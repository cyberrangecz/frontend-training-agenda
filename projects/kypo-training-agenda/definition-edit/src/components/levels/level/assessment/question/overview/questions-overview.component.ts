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
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { SentinelBaseDirective } from '@sentinel/common';
import {
  SentinelControlItem,
  SentinelControlMenuItem,
  SentinelExpandableControlItem,
} from '@sentinel/components/controls';
import { ExtendedMatchingItems } from '@muni-kypo-crp/training-model';
import { Question } from '@muni-kypo-crp/training-model';
import { MultipleChoiceQuestion } from '@muni-kypo-crp/training-model';
import { FreeFormQuestion } from '@muni-kypo-crp/training-model';
import { defer, of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { QuestionChangeEvent } from '../../../../../../model/events/question-change-event';
import { SentinelStepper } from '@sentinel/components/stepper';
import { QuestionStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Wrapper component for questions inside the assessment level
 */
@Component({
  selector: 'kypo-question-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsOverviewComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() questions: Question[];
  @Input() isTest: boolean;
  @Input() disabled: boolean;
  @Output() questionsChange: EventEmitter<Question[]> = new EventEmitter();

  questionsHasError: boolean;
  stepperQuestions: SentinelStepper<QuestionStepperAdapter> = { items: [] };
  selectedStep: number;
  controls: SentinelControlItem[];

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.selectedStep = 0;
    this.initControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('questions' in changes && changes['questions'].isFirstChange()) {
      this.selectedStep = 0;
    }
    if ('questions' in changes && this.questions) {
      this.stepperQuestions.items = this.questions.map((question) => new QuestionStepperAdapter(question));
      this.calculateHasError();
    }
    if ('isTest' in changes && !changes.isTest.isFirstChange()) {
      if (this.isTest && this.questions) {
        this.questions.forEach((question) => (question.required = true));
        this.onQuestionChanged();
      }
    }
    if (this.stepperQuestions.items.length > 0) {
      this.stepperQuestions.items[this.selectedStep].isActive = true;
    }
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
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
   * Creates new free form question
   */
  addFFQ(): void {
    if (this.stepperQuestions.items.length >= 1) {
      this.stepperQuestions.items[this.selectedStep].isActive = false;
    }
    const newFfq = new FreeFormQuestion('New Free Form Question');
    newFfq.required = this.isTest;
    newFfq.choices.push({
      id: null,
      correct: true,
      text: 'Answer 1',
      order: 0,
    });
    const questionStepperAdapter = new QuestionStepperAdapter(newFfq);
    questionStepperAdapter.isActive = true;
    this.stepperQuestions.items.push(questionStepperAdapter);
    this.selectedStep = this.stepperQuestions.items.length - 1;
    this.onQuestionChanged();
  }

  /**
   * Creates new multiple choice question
   */
  addMCQ(): void {
    if (this.stepperQuestions.items.length >= 1) {
      this.stepperQuestions.items[this.selectedStep].isActive = false;
    }
    const newMcq = new MultipleChoiceQuestion('New Multiple Choice Question');
    newMcq.choices.push({
      id: null,
      correct: false,
      text: 'Choice 1',
      order: 0,
    });
    newMcq.choices.push({
      id: null,
      correct: false,
      text: 'Choice 2',
      order: 1,
    });
    newMcq.required = this.isTest;
    const questionStepperAdapter = new QuestionStepperAdapter(newMcq);
    questionStepperAdapter.isActive = true;
    this.stepperQuestions.items.push(questionStepperAdapter);
    this.selectedStep = this.stepperQuestions.items.length - 1;
    this.onQuestionChanged();
  }

  /**
   * Creates new extended matching items question
   */
  addEMI(): void {
    if (this.stepperQuestions.items.length >= 1) {
      this.stepperQuestions.items[this.selectedStep].isActive = false;
    }
    const newEmi = new ExtendedMatchingItems('New Extended Matching Items');
    newEmi.required = this.isTest;
    newEmi.extendedMatchingStatements.push({
      id: null,
      text: 'Statement 1',
      order: 0,
      correctOptionOrder: null,
    });
    newEmi.extendedMatchingStatements.push({
      id: null,
      text: 'Statement 2',
      order: 1,
      correctOptionOrder: null,
    });
    newEmi.extendedMatchingOptions.push({
      id: null,
      text: 'Option 1',
      order: 0,
    });
    newEmi.extendedMatchingOptions.push({
      id: null,
      text: 'Option 2',
      order: 1,
    });
    const questionStepperAdapter = new QuestionStepperAdapter(newEmi);
    questionStepperAdapter.isActive = true;
    this.stepperQuestions.items.push(questionStepperAdapter);
    this.selectedStep = this.stepperQuestions.items.length - 1;
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

  /**
   * Displays confirmation dialog, on confirmation, deletes question on given index
   */
  onDelete(): void {
    const index = this.selectedStep;
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete question',
        `Do you want to delete question "${this.questions[index].title}"?`,
        'Cancel',
        'Delete'
      ),
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        if (result === SentinelDialogResultEnum.CONFIRMED) {
          this.stepperQuestions.items.splice(index, 1);
          this.changeSelectedStepAfterRemoving(index);
          this.onQuestionChanged();
        }
      });
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

  private calculateHasError() {
    this.questionsHasError = this.questions.some((question) => !question.valid);
  }

  private initControls() {
    this.controls = [
      new SentinelExpandableControlItem('add', 'Add', 'primary', of(false), [
        new SentinelControlMenuItem(
          'ffq',
          'Free Form Question',
          'primary',
          of(false),
          defer(() => this.addFFQ()),
          'help_outline'
        ),
        new SentinelControlMenuItem(
          'mcq',
          'Multiple Choice Question',
          'primary',
          of(false),
          defer(() => this.addMCQ()),
          'check_circle'
        ),
        new SentinelControlMenuItem(
          'emi',
          'Extended Matching Items Questions',
          'primary',
          of(false),
          defer(() => this.addEMI()),
          'list_alt'
        ),
      ]),
    ];
  }
}
