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
import { AdaptiveDefinitionSelectComponent } from '../adaptive-definition-select/adaptive-definition-select.component';
import { AdaptiveInstanceFormGroup } from './adaptive-instance-form-group';
import { AbstractControl } from '@angular/forms';
import { AdaptiveInstanceChangeEvent } from '../../models/events/adaptive-instance-change-event';

/**
 * Component for creating new or editing existing training instance
 */
@Component({
  selector: 'kypo-adaptive-instance-edit',
  templateUrl: './adaptive-instance-edit.component.html',
  styleUrls: ['./adaptive-instance-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceEditComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() hasStarted: boolean;
  @Input() editMode: boolean;
  @Output() edited: EventEmitter<AdaptiveInstanceChangeEvent> = new EventEmitter();

  now: Date;
  trainingInstanceFormGroup: AdaptiveInstanceFormGroup;
  userChangedStartTime = false;
  period = 1000;

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
      this.trainingInstanceFormGroup = new AdaptiveInstanceFormGroup(this.trainingInstance);
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
    const dialogRef = this.dialog.open(AdaptiveDefinitionSelectComponent, { data: this.trainingDefinition.value });

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

  private initCurrentTimePeriodicalUpdate() {
    this.now = new Date();
    interval(this.period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        if (!this.userChangedStartTime && !this.editMode) {
          this.startTime.setValue(new Date(this.startTime.value.setSeconds(this.startTime.value.getSeconds() + 1)));
        }
      });
  }

  private setupOnFormChangedEvent() {
    this.trainingInstanceFormGroup.formGroup.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.onChanged());
  }

  private onChanged() {
    this.trainingInstanceFormGroup.setValuesToTrainingInstance(this.trainingInstance);
    this.edited.emit(
      new AdaptiveInstanceChangeEvent(this.trainingInstance, this.trainingInstanceFormGroup.formGroup.valid)
    );
  }
}
