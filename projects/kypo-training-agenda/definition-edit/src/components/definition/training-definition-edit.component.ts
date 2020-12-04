import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
export class TrainingDefinitionEditComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() trainingDefinition: TrainingDefinition;
  @Output() edited: EventEmitter<TrainingDefinitionChangeEvent> = new EventEmitter();

  trainingDefinitionEditFormGroup: TrainingDefinitionEditFormGroup;
  freeFormValid = true;

  constructor() {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('title');
  }
  get description() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('description');
  }
  get showProgress() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('showProgress');
  }
  get outcomes() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('outcomes') as FormArray;
  }
  get prerequisites() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('prerequisites') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
      this.trainingDefinitionEditFormGroup = new TrainingDefinitionEditFormGroup(this.trainingDefinition);
      this.setupOnFormChangedEvent();
    }
  }

  /**
   * Changes form state if change of prerequisites event is emitted from child component
   * @param event form state change event emitted from child component
   */
  prerequisitesChange(event: FormGroup) {
    this.freeFormValid = event.valid;
    this.prerequisites.clear();
    event.value['items'].forEach((item) => {
      (this.prerequisites as FormArray).push(new FormControl(item));
    });
  }

  /**
   * Changes form state if change of outcomes event is emitted from child component
   * @param event form state change event emitted from child component
   */
  outcomesChange(event: FormGroup) {
    this.freeFormValid = event.valid;
    this.outcomes.clear();
    event.value['items'].forEach((item) => {
      (this.outcomes as FormArray).push(new FormControl(item));
    });
  }

  private setupOnFormChangedEvent() {
    this.trainingDefinitionEditFormGroup.formGroup.valueChanges
      .pipe(takeWhile((_) => this.isAlive))
      .subscribe((_) => this.onChanged());
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
