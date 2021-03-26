import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdaptiveQuestion, Choice, PhaseRelation, QuestionnairePhase } from '@muni-kypo-crp/training-model';

/**
 * @dynamic
 */
export class QuestionnairePhaseEditFormGroup {
  formGroup: FormGroup;

  constructor(phase: QuestionnairePhase) {
    this.formGroup = new FormGroup({
      title: new FormControl(phase.title, Validators.required),
      questions: new FormArray(
        phase.questions.map((question) => QuestionnairePhaseEditFormGroup.createQuestions(question))
      ),
      phaseRelations: new FormArray(
        phase.phaseRelations.map((relation) => QuestionnairePhaseEditFormGroup.createRelations(relation))
      ),
    });
  }

  private static createRelations(relation: PhaseRelation): FormGroup {
    return new FormGroup({
      id: new FormControl(relation.id),
      order: new FormControl(relation.order),
      phaseId: new FormControl(relation.phaseId),
      questionIds: new FormControl(relation.questionIds),
      successRate: new FormControl(relation.successRate, [Validators.required, Validators.min(0), Validators.max(100)]),
    });
  }

  private static createQuestions(question: AdaptiveQuestion): FormGroup {
    return new FormGroup({
      text: new FormControl(question.text, Validators.required),
      choices: new FormArray(question.choices.map((choice) => QuestionnairePhaseEditFormGroup.createChoices(choice))),
      id: new FormControl(question.id),
      order: new FormControl(question.order),
      questionType: new FormControl(question.questionType),
    });
  }

  private static createChoices(choice: Choice): FormGroup {
    return new FormGroup({
      text: new FormControl(choice.text, Validators.required),
      correct: new FormControl(choice.correct, Validators.required),
      id: new FormControl(choice.id),
      order: new FormControl(choice.order),
    });
  }

  setToPhase(phase: QuestionnairePhase): void {
    phase.title = this.formGroup.get('title').value;
    phase.questions = this.formGroup.get('questions').value;
    phase.phaseRelations = this.formGroup.get('phaseRelations').value;
    phase.valid = this.formGroup.valid;
  }
}
