import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '@muni-kypo-crp/training-model';

export class TaskEditFormGroup {
  formGroup: FormGroup;

  constructor(task: Task) {
    this.formGroup = new FormGroup({
      title: new FormControl(task.title, Validators.required),
      answer: new FormControl(task.answer, [Validators.required, Validators.maxLength(50)]),
      solution: new FormControl(task.solution, Validators.required),
      content: new FormControl(task.content, Validators.required),
      incorrectAnswerLimit: new FormControl(task.incorrectAnswerLimit, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      modifySandbox: new FormControl(task.modifySandbox),
    });
  }

  setToTask(task: Task): void {
    task.title = this.formGroup.get('title').value;
    task.answer = this.formGroup.get('answer').value;
    task.answer = task.answer ? task.answer.trim() : task.answer;
    task.solution = this.formGroup.get('solution').value;
    task.content = this.formGroup.get('content').value;
    task.incorrectAnswerLimit = this.formGroup.get('incorrectAnswerLimit').value;
    task.valid = this.formGroup.valid;
    task.modifySandbox = this.formGroup.get('modifySandbox').value;
  }
}
