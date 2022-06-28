import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { TrainingDefinitionChangeEvent } from '../../model/events/training-definition-change-event';
import { TrainingDefinitionEditFormGroup } from './training-definition-edit-form-group';

/**
 * Component for creating new or editing already existing training definition
 */
@Component({
  selector: 'kypo-training-definition-edit',
  templateUrl: './training-definition-edit.component.html',
  styleUrls: ['./training-definition-edit.component.css'],
})
export class TrainingDefinitionEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() trainingDefinition: TrainingDefinition;
  @Output() edited: EventEmitter<TrainingDefinitionChangeEvent> = new EventEmitter();

  trainingDefinitionEditFormGroup: TrainingDefinitionEditFormGroup;
  freeFormValid = true;

  constructor() {
    super();
  }

  get title(): AbstractControl {
    return this.trainingDefinitionEditFormGroup.formGroup.get('title');
  }
  get description(): AbstractControl {
    return this.trainingDefinitionEditFormGroup.formGroup.get('description');
  }
  get showProgress(): AbstractControl {
    return this.trainingDefinitionEditFormGroup.formGroup.get('showProgress');
  }
  get outcomes(): UntypedFormArray {
    return this.trainingDefinitionEditFormGroup.formGroup.get('outcomes') as UntypedFormArray;
  }
  get prerequisites(): UntypedFormArray {
    return this.trainingDefinitionEditFormGroup.formGroup.get('prerequisites') as UntypedFormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingDefinition' in changes) {
      this.trainingDefinitionEditFormGroup = new TrainingDefinitionEditFormGroup(this.trainingDefinition);
      this.setupOnFormChangedEvent();
    }
  }

  /**
   * Changes form state if change of prerequisites event is emitted from child component
   * @param event form state change event emitted from child component
   */
  prerequisitesChange(event: UntypedFormGroup): void {
    this.freeFormValid = event.valid;
    this.prerequisites.clear();
    event.value['items'].forEach((item) => {
      (this.prerequisites as UntypedFormArray).push(new UntypedFormControl(item));
    });
  }

  /**
   * Changes form state if change of outcomes event is emitted from child component
   * @param event form state change event emitted from child component
   */
  outcomesChange(event: UntypedFormGroup): void {
    this.freeFormValid = event.valid;
    this.outcomes.clear();
    event.value['items'].forEach((item) => {
      (this.outcomes as UntypedFormArray).push(new UntypedFormControl(item));
    });
  }

  checkboxTouched(): void {
    this.title.markAsTouched();
  }

  private setupOnFormChangedEvent() {
    this.trainingDefinitionEditFormGroup.formGroup.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.onChanged());
  }

  private onChanged() {
    this.trainingDefinitionEditFormGroup.setValuesToTrainingDefinition(this.trainingDefinition);
    this.edited.emit(
      new TrainingDefinitionChangeEvent(
        this.trainingDefinition,
        this.trainingDefinitionEditFormGroup.formGroup.valid && this.freeFormValid
      )
    );
  }
}
