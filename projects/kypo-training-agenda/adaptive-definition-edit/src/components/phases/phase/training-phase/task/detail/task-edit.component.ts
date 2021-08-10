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
import { TaskEditFormGroup } from './task-edit-form-group';
import { AbstractControl } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { Task } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-task-configuration',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() task: Task;
  @Output() taskChange: EventEmitter<Task> = new EventEmitter();

  taskConfigFormGroup: TaskEditFormGroup;

  get title(): AbstractControl {
    return this.taskConfigFormGroup.formGroup.get('title');
  }
  get answer(): AbstractControl {
    return this.taskConfigFormGroup.formGroup.get('answer');
  }
  get solution(): AbstractControl {
    return this.taskConfigFormGroup.formGroup.get('solution');
  }
  get content(): AbstractControl {
    return this.taskConfigFormGroup.formGroup.get('content');
  }
  get incorrectAnswerLimit(): AbstractControl {
    return this.taskConfigFormGroup.formGroup.get('incorrectAnswerLimit');
  }

  get modifySandbox(): AbstractControl {
    return this.taskConfigFormGroup.formGroup.get('modifySandbox');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('task' in changes) {
      this.taskConfigFormGroup = new TaskEditFormGroup(this.task);
      this.markFormsAsTouched();
      this.taskConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.taskConfigFormGroup.setToTask(this.task);
        this.taskChange.emit(this.task);
      });
    }
  }

  private markFormsAsTouched(): void {
    this.title.markAsTouched();
    this.incorrectAnswerLimit.markAsTouched();
    this.answer.markAsTouched();
  }
}
