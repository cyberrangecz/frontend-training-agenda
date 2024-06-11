import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { TrainingInstanceChangeEvent } from '../../model/events/training-instance-change-event';
import { TrainingDefinitionSelectComponent } from '../training-definition-select/training-definition-select.component';
import { TrainingInstanceFormGroup } from './training-instance-form-group';
import { AbstractControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Component for creating new or editing existing training instance
 */
@Component({
  selector: 'kypo-training-instance-edit',
  templateUrl: './training-instance-edit.component.html',
  styleUrls: ['./training-instance-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceEditComponent implements OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() hasStarted: boolean;
  @Input() editMode: boolean;
  @Output() edited: EventEmitter<TrainingInstanceChangeEvent> = new EventEmitter();

  destroyRef = inject(DestroyRef);
  now: Date;
  trainingInstanceFormGroup: TrainingInstanceFormGroup;

  constructor(private dialog: MatDialog) {}

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
      this.trainingInstanceFormGroup = new TrainingInstanceFormGroup(this.trainingInstance);
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result && result.type === 'confirm') {
          this.trainingInstanceFormGroup.formGroup.markAsDirty();
          this.trainingDefinition.setValue(result.trainingDef);
        }
      });
  }

  private setupOnFormChangedEvent() {
    this.trainingInstanceFormGroup.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onChanged());
  }

  private onChanged() {
    this.trainingInstanceFormGroup.setValuesToTrainingInstance(this.trainingInstance);
    this.edited.emit(
      new TrainingInstanceChangeEvent(this.trainingInstance, this.trainingInstanceFormGroup.formGroup.valid)
    );
  }
}
