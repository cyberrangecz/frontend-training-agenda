import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
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
export class AdaptiveInstanceEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() hasStarted: boolean;
  @Input() editMode: boolean;
  @Output() edited: EventEmitter<AdaptiveInstanceChangeEvent> = new EventEmitter();

  now: Date;
  trainingInstanceFormGroup: AdaptiveInstanceFormGroup;

  constructor(private dialog: MatDialog) {
    super();
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
  get accessTokenPrefix(): AbstractControl {
    return this.trainingInstanceFormGroup.formGroup.get('accessTokenPrefix');
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
