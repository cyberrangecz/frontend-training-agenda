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
import { MatDialog } from '@angular/material/dialog';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../model/events/training-instance-change-event';
import { TrainingDefinitionSelectComponent } from '../training-definition-select/training-definition-select.component';
import { TrainingInstanceFormGroup } from './training-instance-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for creating new or editing existing training instance
 */
@Component({
  selector: 'kypo-training-instance-edit',
  templateUrl: './training-instance-edit.component.html',
  styleUrls: ['./training-instance-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceEditComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() hasStarted: boolean;
  @Output() edited: EventEmitter<TrainingInstanceChangeEvent> = new EventEmitter();

  now: Date;
  trainingInstanceFormGroup: TrainingInstanceFormGroup;
  userChangedStartTime = false;
  period = 60000;

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.initCurrentTimePeriodicalUpdate();
  }

  get startTime(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('startTime');
  }
  get endTime(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('endTime');
  }
  get title(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('title');
  }
  get trainingDefinition(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('trainingDefinition');
  }
  get accessToken(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('accessToken');
  }
  get localEnvironment(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('localEnvironment');
  }
  get backwardMode(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('backwardMode');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.trainingInstanceFormGroup = new TrainingInstanceFormGroup(this.trainingInstance);
      this.setUpPeriodicTimeStartTimeUpdate();
      this.setupOnFormChangedEvent();
    }
    if ('hasStarted' in changes && this.hasStarted) {
      this.trainingInstanceFormGroup.disable();
    }
  }

  /**
   * Opens popup dialog to choose a training definition to associate with edited training instance
   */
  selectTrainingDefinition(): void {
    const dialogRef = this.dialog.open(TrainingDefinitionSelectComponent, { data: this.trainingDefinition.value });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        if (result && result.type === 'confirm') {
          this.trainingInstanceFormGroup.formGroup.markAsDirty();
          this.trainingDefinition.setValue(result.trainingDef);
        }
      });
  }

  /**
   * Changes internal component state to prevent from from recalculating start time if user already set the value
   */
  onStartTimeChanged(): void {
    this.userChangedStartTime = true;
  }

  private setUpPeriodicTimeStartTimeUpdate() {
    interval(this.period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        if (!this.userChangedStartTime) {
          this.startTime.setValue(new Date(this.startTime.value.setMinutes(this.startTime.value.getMinutes() + 1)));
        }
      });
  }

  private initCurrentTimePeriodicalUpdate() {
    this.now = new Date();
    interval(this.period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => (this.now = new Date()));
  }

  private setupOnFormChangedEvent() {
    this.trainingInstanceFormGroup.formGroup.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.onChanged());
  }

  private onChanged() {
    this.trainingInstanceFormGroup.setValuesToTrainingInstance(this.trainingInstance);
    this.edited.emit(
      new TrainingInstanceChangeEvent(this.trainingInstance, this.trainingInstanceFormGroup.formGroup.valid)
    );
  }
}
