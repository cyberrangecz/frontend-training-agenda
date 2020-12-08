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
  controls: SentinelControlItem[];

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.initControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('questions' in changes && this.questions) {
      this.calculateHasError();
    }
    if ('isTest' in changes && !changes.isTest.isFirstChange()) {
      if (this.isTest && this.questions) {
        this.questions.forEach((question) => (question.required = true));
        this.onQuestionChanged();
      }
    }
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  /**
   * Creates new free form question
   */
  addFFQ(): void {
    const newFfq = new FreeFormQuestion('New Free Form Question');
    newFfq.required = this.isTest;
    this.questions.push(newFfq);
    this.onQuestionChanged();
  }

  /**
   * Creates new multiple choice question
   */
  addMCQ(): void {
    const newMcq = new MultipleChoiceQuestion('New Multiple Choice Question');
    newMcq.options.push('Option 1');
    newMcq.options.push('Option 2');
    newMcq.required = this.isTest;
    this.questions.push(newMcq);
    this.onQuestionChanged();
  }

  /**
   * Creates new extended matching items question
   */
  addEMI(): void {
    const newEmi = new ExtendedMatchingItems('New Extended Matching Items');
    newEmi.required = this.isTest;
    newEmi.cols.push('Column 1');
    newEmi.cols.push('Column 2');
    newEmi.rows.push('Row 1');
    newEmi.rows.push('Row 2');
    this.questions.push(newEmi);
    this.onQuestionChanged();
  }

  /**
   * Changes internal state of the component and emits event to parent component
   * @param event question change state event
   */
  onQuestionChanged(event: QuestionChangeEvent = null): void {
    this.calculateHasError();
    if (event) {
      this.questions[event.index] = event.question;
    }
    this.questionsChange.emit(this.questions);
  }

  /**
   * Displays confirmation dialog, on confirmation, deletes question on given index
   * @param index index of question which should be deleted
   */
  onDelete(index: number): void {
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
          this.questions.splice(index, 1);
          this.onQuestionChanged();
        }
      });
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
