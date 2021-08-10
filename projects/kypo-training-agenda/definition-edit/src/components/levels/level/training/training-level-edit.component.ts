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
import { Hint, TrainingLevel } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { TrainingLevelEditFormGroup } from './training-level-edit-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for editing new or existing training level
 */
@Component({
  selector: 'kypo-training-level-edit',
  templateUrl: './training-level-edit.component.html',
  styleUrls: ['./training-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLevelEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() level: TrainingLevel;
  @Input() variantSandboxes: boolean;
  @Output() levelChange: EventEmitter<TrainingLevel> = new EventEmitter();
  trainingLevelConfigFormGroup: TrainingLevelEditFormGroup;

  get title(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('title');
  }
  get content(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('content');
  }
  get solution(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('solution');
  }
  get maxScore(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('maxScore');
  }
  get solutionPenalized(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('solutionPenalized');
  }
  get incorrectAnswerLimit(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('incorrectAnswerLimit');
  }
  get answer(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('answer');
  }
  get answerVariableName(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('answerVariableName');
  }
  get estimatedDuration(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('estimatedDuration');
  }
  get hints(): AbstractControl {
    return this.trainingLevelConfigFormGroup.formGroup.get('hints');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes || 'variantSandboxes' in changes) {
      this.trainingLevelConfigFormGroup = new TrainingLevelEditFormGroup(this.level, this.variantSandboxes);
      this.setFormsAsTouched();
      this.trainingLevelConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.trainingLevelConfigFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
    if ('variantSandboxes' in changes) {
      if (this.variantSandboxes) {
        this.answerVariableName.enable();
      } else {
        this.answerVariableName.setValue(null);
        this.answerVariableName.disable();
      }
    }
  }

  /**
   * Sets changed hints to the current level and emits level change event
   * @param hints new state of hints associated with current level
   */
  hintsChanged(hints: Hint[]): void {
    this.level.hints = hints;
    this.trainingLevelConfigFormGroup.setToLevel(this.level);
    this.levelChange.emit(this.level);
  }

  /**
   * Sets state of selected forms to touched. This is done due to proper error rendering when component is reloaded.
   */
  private setFormsAsTouched(): void {
    this.title.markAsTouched();
    this.estimatedDuration.markAsTouched();
    this.maxScore.markAsTouched();
    this.incorrectAnswerLimit.markAsTouched();
    this.answer.markAsTouched();
  }
}
