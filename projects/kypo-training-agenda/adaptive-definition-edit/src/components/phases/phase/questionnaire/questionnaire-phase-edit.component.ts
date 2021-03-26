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
import { takeWhile } from 'rxjs/operators';
import { QuestionnairePhaseEditFormGroup } from './questionnaire-phase-edit-form-group';
import { AbstractControl, FormArray } from '@angular/forms';
import {
  SentinelControlItem,
  SentinelControlMenuItem,
  SentinelExpandableControlItem,
} from '@sentinel/components/controls';
import { defer, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  AdaptiveQuestion,
  Choice,
  PhaseRelation,
  QuestionnairePhase,
  QuestionnaireTypeEnum,
  QuestionTypeEnum,
  TrainingPhase,
} from '@muni-kypo-crp/training-model';
import { PhaseEditService } from '../../../../services/state/phase/phase-edit.service';

@Component({
  selector: 'kypo-questionnaire-phase-configuration',
  templateUrl: './questionnaire-phase-edit.component.html',
  styleUrls: ['./questionnaire-phase-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnairePhaseEditComponent extends SentinelBaseDirective implements OnChanges, OnInit {
  @Input() phase: QuestionnairePhase;
  @Output() phaseChange: EventEmitter<QuestionnairePhase> = new EventEmitter();
  @Input() updateQuestionsFlag: boolean;
  @Input() presentTrainingPhases: TrainingPhase[];

  questionnaireFormGroup: QuestionnairePhaseEditFormGroup;
  questionTypes = QuestionTypeEnum;
  questionnaireTypes = QuestionnaireTypeEnum;
  addQuestionControls: SentinelControlItem[];
  addRelationControls: SentinelControlItem[];
  addChoiceControls: SentinelControlItem[];

  constructor(private dialog: MatDialog, private phaseService: PhaseEditService) {
    super();
  }

  get title(): AbstractControl {
    return this.questionnaireFormGroup.formGroup.get('title');
  }

  get questions(): FormArray {
    return this.questionnaireFormGroup.formGroup.get('questions') as FormArray;
  }

  getChoices(index: number): FormArray {
    return this.questions.at(index).get('choices') as FormArray;
  }

  get phaseRelations(): FormArray {
    return this.questionnaireFormGroup.formGroup.get('phaseRelations') as FormArray;
  }

  ratingLevelChanged(ratingLevel: number, questionIndex): void {
    const currentChoiceNum = this.phase.questions[questionIndex].choices.length;
    if (currentChoiceNum < ratingLevel) {
      for (let i = 0; i < ratingLevel - currentChoiceNum; i++) {
        this.phase.questions[questionIndex].choices.push(
          this.createNewChoice(this.phase.questions[questionIndex].choices.length, (i + 1).toString())
        );
      }
    }
    if (currentChoiceNum > ratingLevel) {
      this.phase.questions[questionIndex].choices.splice(ratingLevel, currentChoiceNum - ratingLevel);
    }
    this.updateForm();
  }

  private createNewChoice(order: number, text: string): Choice {
    const newChoice = new Choice();
    newChoice.order = order;
    newChoice.text = text;
    newChoice.correct = true;
    return newChoice;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('phase' in changes || 'updateQuestionsFlag' in changes) {
      this.questionnaireFormGroup = new QuestionnairePhaseEditFormGroup(this.phase);
      this.questionnaireFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.questionnaireFormGroup.setToPhase(this.phase);
        this.phaseChange.emit(this.phase);
      });
    }
  }

  private updateForm() {
    this.phaseChange.emit(this.phase);
    this.questionnaireFormGroup = new QuestionnairePhaseEditFormGroup(this.phase);
    this.questionnaireFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.questionnaireFormGroup.setToPhase(this.phase);
      this.phaseChange.emit(this.phase);
    });
  }

  ngOnInit() {
    this.createControls();
  }

  addQuestion(type: QuestionTypeEnum) {
    const newQuestion = new AdaptiveQuestion();
    newQuestion.questionType = type;
    newQuestion.choices = [];
    newQuestion.text = 'Question text?';
    newQuestion.order = this.phase.questions.length;
    this.phase.questions.push(newQuestion);
    this.updateForm();
  }

  addOption(questionIndex: number, text: string) {
    const newChoice = new Choice();
    newChoice.order = this.phase.questions[questionIndex].choices.length;
    newChoice.text = text;
    newChoice.correct = true;
    this.phase.questions[questionIndex].choices.push(newChoice);
    this.updateForm();
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.phase.questions[questionIndex].choices.splice(optionIndex, 1);
    this.phase.questions[questionIndex].choices.forEach((choice, index) => (choice.order = index));
    this.updateForm();
  }

  deleteQuestion(questionIndex: number) {
    this.removeQuestionFromRelations(this.phase.questions[questionIndex].id);
    this.phase.questions.splice(questionIndex, 1);
    this.phase.questions.forEach((question, index) => (question.order = index));
    this.updateForm();
  }

  private removeQuestionFromRelations(qId: number) {
    this.phase.phaseRelations.forEach((relation) => {
      relation.questionIds = relation.questionIds.filter((id) => id !== qId);
    });
  }

  getTrainingPhaseTitle(id: number) {
    let result = '';
    result = this.presentTrainingPhases.find((phase) => phase.id === id).title;
    return result;
  }

  deleteRelation(relationIndex: number) {
    this.phase.phaseRelations.splice(relationIndex, 1);
    this.phase.phaseRelations.forEach((relation, index) => (relation.order = index));
    this.updateForm();
  }

  onQuestionAddedToRelation(relationIndex: number, questionId: number) {
    this.phase.phaseRelations[relationIndex].questionIds.push(questionId);
    this.updateForm();
  }

  getQuestionTitleById(qId: number): string {
    return this.phase.questions.find((question) => question.id === qId).text;
  }

  getQuestionIconById(qId: number): string {
    switch (this.phase.questions.find((question) => question.id === qId).questionType) {
      case QuestionTypeEnum.RFQ:
        return 'star_half';
      case QuestionTypeEnum.MCQ:
        return 'check_circle_outline';
      case QuestionTypeEnum.FFQ:
        return 'edit';
    }
  }

  get phaseRelationMenuItems() {
    const menuItems = [];
    this.presentTrainingPhases.forEach((phase) => menuItems.push(phase));
    return menuItems;
  }

  getValidQuestionMenuItems(relationIndex: number) {
    let questionsWithIds = this.phase.questions.filter((q) => q.id !== undefined && q.id !== null);
    this.phase.phaseRelations[relationIndex].questionIds.forEach((id) => {
      questionsWithIds = questionsWithIds.filter((question) => question.id !== id);
    });
    return questionsWithIds;
  }

  onQuestionRemovedFromRelation(relationIndex: number, qId: number) {
    this.phase.phaseRelations[relationIndex].questionIds = this.phase.phaseRelations[relationIndex].questionIds.filter(
      (id) => id !== qId
    );
    this.updateForm();
  }

  onRelationCreated(phase: TrainingPhase) {
    const newRelation = new PhaseRelation();
    newRelation.questionIds = [];
    newRelation.successRate = 0;
    newRelation.phaseId = phase.id;
    newRelation.order = this.phase.phaseRelations.length;
    this.phase.phaseRelations.push(newRelation);
    this.updateForm();
  }

  private createControls(): void {
    this.addQuestionControls = [
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
    ];
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }
}
