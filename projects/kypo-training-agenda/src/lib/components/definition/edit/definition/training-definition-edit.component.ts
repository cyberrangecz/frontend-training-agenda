import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {User} from 'kypo2-auth';
import {takeWhile} from 'rxjs/operators';
import {TrainingDefinitionChangeEvent} from '../../../../model/events/training-definition-change-event';
import {TrainingDefinition} from 'kypo-training-model';
import {KypoBaseComponent} from 'kypo-common';
import {TrainingDefinitionEditFormGroup} from './training-definition-edit-form-group';
import {FreeFormItemsChangeEvent} from '../../../../model/adapters/other/free-form-items-change-event';

/**
 * Component for creating new or editing already existing training definition
 */
@Component({
  selector: 'kypo-training-definition-edit',
  templateUrl: './training-definition-edit.component.html',
  styleUrls: ['./training-definition-edit.component.css']
})
export class TrainingDefinitionEditComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() trainingDefinition: TrainingDefinition;
  @Input() activeUser: User;
  @Output() edited: EventEmitter<TrainingDefinitionChangeEvent> = new EventEmitter();

  trainingDefinitionEditFormGroup: TrainingDefinitionEditFormGroup;
  freeFormValid = true;

  constructor() {
    super();
  }

  ngOnInit() {
  }

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
  prerequisitesChange(event: FreeFormItemsChangeEvent) {
    this.freeFormValid = event.validity;
    if (event.isAdded) {
      (this.prerequisites as FormArray).push(new FormControl(''));
    } else if (event.isDeleted) {
      this.prerequisites.removeAt(event.index);
    } else if (event.cleared) {
      this.prerequisites.clear();
      this.prerequisites.setValue(this.prerequisites.value);
    } else {
      this.prerequisites.at(event.index).setValue(event.items[event.index]);
    }
  }
  /**
   * Changes form state if change of outcomes event is emitted from child component
   * @param event form state change event emitted from child component
   */
  outcomesChange(event: FreeFormItemsChangeEvent) {
    this.freeFormValid = event.validity;
    if (event.isAdded) {
      (this.outcomes as FormArray).push(new FormControl(''));
    } else if (event.isDeleted) {
      this.outcomes.removeAt(event.index);
    } else if (event.cleared) {
      this.outcomes.clear();
      this.outcomes.setValue(this.outcomes.value);
    } else {
      this.outcomes.at(event.index).setValue(event.items[event.index]);
    }
  }

  private setupOnFormChangedEvent() {
    this.trainingDefinitionEditFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(_ => this.onChanged());
  }

  private onChanged() {
    this.trainingDefinitionEditFormGroup.setValuesToTrainingDefinition(this.trainingDefinition);
    this.edited.emit(new TrainingDefinitionChangeEvent(
      this.trainingDefinition,
      this.trainingDefinitionEditFormGroup.formGroup.valid && this.freeFormValid)
    );
  }
}
