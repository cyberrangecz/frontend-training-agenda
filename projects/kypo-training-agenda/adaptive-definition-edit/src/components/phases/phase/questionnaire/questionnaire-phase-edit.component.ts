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
import { takeWhile } from 'rxjs/operators';
import { QuestionnairePhaseEditFormGroup } from './questionnaire-phase-edit-form-group';
import { AbstractControl, FormArray } from '@angular/forms';
import {
  AdaptiveQuestion,
  PhaseRelation,
  QuestionnairePhase,
  QuestionnaireTypeEnum,
  QuestionTypeEnum,
  TrainingPhase,
} from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-questionnaire-phase-configuration',
  templateUrl: './questionnaire-phase-edit.component.html',
  styleUrls: ['./questionnaire-phase-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnairePhaseEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() phase: QuestionnairePhase;
  @Output() phaseChange: EventEmitter<QuestionnairePhase> = new EventEmitter();
  @Input() updateQuestionsFlag: boolean;
  @Input() presentTrainingPhases: TrainingPhase[];

  questionnaireFormGroup: QuestionnairePhaseEditFormGroup;
  questionnaireTypes = QuestionnaireTypeEnum;

  get title(): AbstractControl {
    return this.questionnaireFormGroup.formGroup.get('title');
  }

  get questions(): FormArray {
    return this.questionnaireFormGroup.formGroup.get('questions') as FormArray;
  }

  get phaseRelations(): FormArray {
    return this.questionnaireFormGroup.formGroup.get('phaseRelations') as FormArray;
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

  /**
   * Changes internal state of the component and emits change event to parent component
   * @param questions new state of changed questions
   */
  onQuestionsChanged(questions: AdaptiveQuestion[]): void {
    this.phase.questions = questions;
    this.questionnaireFormGroup.setToPhase(this.phase);
    this.phaseChange.emit(this.phase);
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

  removeQuestionFromRelations(qId: number) {
    this.phase.phaseRelations.forEach((relation) => {
      relation.questionIds = relation.questionIds.filter((id) => id !== qId);
    });
  }

  private updateForm() {
    this.phaseChange.emit(this.phase);
    this.questionnaireFormGroup = new QuestionnairePhaseEditFormGroup(this.phase);
    this.questionnaireFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.questionnaireFormGroup.setToPhase(this.phase);
      this.phaseChange.emit(this.phase);
    });
  }
}
