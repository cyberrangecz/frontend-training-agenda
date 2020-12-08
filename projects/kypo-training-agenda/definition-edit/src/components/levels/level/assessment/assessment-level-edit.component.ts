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
import { AssessmentLevel } from '@muni-kypo-crp/training-model';
import { Question } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { AssessmentLevelEditFormGroup } from './assessment-level-edit-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for editing new or existing assessment level
 */
@Component({
  selector: 'kypo-assessment-level-configuration',
  templateUrl: './assessment-level-edit.component.html',
  styleUrls: ['./assessment-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentLevelEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() level: AssessmentLevel;
  @Output() levelChange: EventEmitter<AssessmentLevel> = new EventEmitter();
  assessmentFormGroup: AssessmentLevelEditFormGroup;

  get title(): AbstractControl {
    return this.assessmentFormGroup.formGroup.get('title');
  }
  get instructions(): AbstractControl {
    return this.assessmentFormGroup.formGroup.get('instructions');
  }
  get isTest(): AbstractControl {
    return this.assessmentFormGroup.formGroup.get('isTest');
  }
  get estimatedDuration(): AbstractControl {
    return this.assessmentFormGroup.formGroup.get('estimatedDuration');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.assessmentFormGroup = new AssessmentLevelEditFormGroup(this.level);
      this.assessmentFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.assessmentFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
  }

  /**
   * Changes internal state of the component and emits change event to parent component
   * @param questions new state of changed questions
   */
  onQuestionsChanged(questions: Question[]): void {
    this.level.questions = questions;
    this.assessmentFormGroup.setToLevel(this.level);
    this.levelChange.emit(this.level);
  }
}
