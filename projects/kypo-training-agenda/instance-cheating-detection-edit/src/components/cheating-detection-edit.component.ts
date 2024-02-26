import { Component } from '@angular/core';
import { SentinelBaseDirective, SentinelValidators } from '@sentinel/common';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CheatingDetectionEditFormGroup } from './cheating-detection-edit-form-group';
import { CheatingDetectionEditService } from '../services/cheating-detection-edit.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { CheatingDetection, CheatingDetectionStateEnum, TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelControlItem } from '@sentinel/components/controls';
import { map, take, takeWhile } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Main component of training instance cheating detection edit.
 */
@Component({
  selector: 'kypo-training-instance-cheating-detection-edit',
  templateUrl: './cheating-detection-edit.component.html',
  styleUrls: ['./cheating-detection-edit.component.css'],
})
export class CheatingDetectionEditComponent extends SentinelBaseDirective {
  trainingInstance$: Observable<TrainingInstance>;
  cheatingDetectionEditFormGroup: CheatingDetectionEditFormGroup;
  cheatingDetection: CheatingDetection;
  controls: SentinelControlItem[];
  trainingInstanceId: number;
  maximumProximityThreshold = 86400;
  isAPG = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: CheatingDetectionEditService
  ) {
    super();
    this.trainingInstance$ = this.activeRoute.data.pipe(
      takeWhile(() => this.isAlive),
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME])
    );
    this.trainingInstance$.subscribe((instance) => {
      this.trainingInstanceId = instance.id;
    });
    this.cheatingDetection = new CheatingDetection();
    this.cheatingDetection.forbiddenCommandsState = CheatingDetectionStateEnum.Disabled;
    this.cheatingDetectionEditFormGroup = new CheatingDetectionEditFormGroup(
      this.cheatingDetection,
      this.trainingInstanceId
    );
    this.initControls(this.editService);
    this.cheatingDetectionEditFormGroup.formGroup.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.initControls(this.editService));
  }

  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(take(1)).subscribe();
  }

  ifNotAPG() {
    return !this.isAPG;
  }
  get answerSimilarityMethod(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('answerSimilarityDetection');
  }
  get locationSimilarityMethod(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('locationSimilarityDetection');
  }
  get timeProximityMethod(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('timeProximityDetection');
  }
  get minimalSolveTimeMethod(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('minimalSolveTimeDetection');
  }
  get noCommandsMethod(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('noCommandsDetection');
  }
  get forbiddenCommandsMethod(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('forbiddenCommandsDetection');
  }

  get timeThreshold(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('proximityThreshold');
  }

  get forbiddenCommands(): UntypedFormArray {
    return this.cheatingDetectionEditFormGroup.formGroup.get('forbiddenCommands') as UntypedFormArray;
  }

  /**
   * Deletes an choice (one of the answers)
   * @param index index of the choice which should be deleted
   */
  deleteForbiddenCommand(index: number): void {
    this.forbiddenCommands.removeAt(index);
    this.forbiddenCommands.controls
      .slice(index)
      .forEach((choice) => choice.get('order').setValue(choice.get('order').value - 1));
    this.forbiddenCommandsChanged();
  }

  addForbiddenCommand(): void {
    this.forbiddenCommands.push(
      new UntypedFormGroup({
        command: new UntypedFormControl('', [SentinelValidators.noWhitespace, Validators.required]),
        type: new UntypedFormControl('', [Validators.required]),
        cheatingDetectionId: new UntypedFormControl(this.cheatingDetection.id),
      })
    );
    this.forbiddenCommandsChanged();
  }

  changeType(i: number, value: string): void {
    this.forbiddenCommands.controls[i].get('type').setValue(value);
    this.forbiddenCommandsChanged();
  }
  forbiddenCommandsChanged(): void {
    this.cheatingDetectionEditFormGroup.formGroup.markAsDirty();
  }

  isFormValid(): boolean {
    return !this.cheatingDetectionEditFormGroup.formGroup.valid;
  }

  initControls(editService: CheatingDetectionEditService): void {
    this.controls = [
      new SentinelControlItem(
        'create',
        'Create',
        'primary',
        of(this.isFormValid()),
        defer(() =>
          editService.create(this.cheatingDetectionEditFormGroup.createCheatingDetection(), this.trainingInstanceId)
        )
      ),
    ];
  }
}
