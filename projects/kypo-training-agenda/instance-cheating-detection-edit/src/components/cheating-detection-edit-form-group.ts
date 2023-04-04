import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CheatingDetection, CheatingDetectionStateEnum } from '@muni-kypo-crp/training-model';
import { SentinelValidators } from '@sentinel/common';

/**
 * Form control class of cheating detection edit form
 */
export class CheatingDetectionEditFormGroup {
  formGroup: UntypedFormGroup;
  trainingInstanceId: number;

  constructor(cheatingDetection: CheatingDetection, trainingInstanceId: number) {
    this.formGroup = new UntypedFormGroup({
      answerSimilarityDetection: new UntypedFormControl(cheatingDetection.answerSimilarityState),
      locationSimilarityDetection: new UntypedFormControl(cheatingDetection.locationSimilarityState),
      timeProximityDetection: new UntypedFormControl(cheatingDetection.timeProximityState),
      minimalSolveTimeDetection: new UntypedFormControl(cheatingDetection.minimalSolveTimeState),
      noCommandsDetection: new UntypedFormControl(cheatingDetection.noCommandsState),
      timeThreshold: new UntypedFormControl(cheatingDetection.proximityThreshold, [
        SentinelValidators.pattern('^[0-9]*$'),
      ]),
    });
    this.trainingInstanceId = trainingInstanceId;
  }
  /**
   * Sets values from form to training definition object
   */
  createCheatingDetection(): CheatingDetection {
    const cheatingDetection = new CheatingDetection();
    cheatingDetection.answerSimilarityState = this.formGroup.get('answerSimilarityDetection').value
      ? CheatingDetectionStateEnum.Queued
      : CheatingDetectionStateEnum.Disabled;
    cheatingDetection.locationSimilarityState = this.formGroup.get('locationSimilarityDetection').value
      ? CheatingDetectionStateEnum.Queued
      : CheatingDetectionStateEnum.Disabled;
    cheatingDetection.timeProximityState = this.formGroup.get('timeProximityDetection').value
      ? CheatingDetectionStateEnum.Queued
      : CheatingDetectionStateEnum.Disabled;
    cheatingDetection.minimalSolveTimeState = this.formGroup.get('minimalSolveTimeDetection').value
      ? CheatingDetectionStateEnum.Queued
      : CheatingDetectionStateEnum.Disabled;
    cheatingDetection.noCommandsState = this.formGroup.get('noCommandsDetection').value
      ? CheatingDetectionStateEnum.Queued
      : CheatingDetectionStateEnum.Disabled;
    cheatingDetection.proximityThreshold = this.formGroup.get('timeThreshold').value;
    cheatingDetection.results = 0;
    cheatingDetection.currentState = CheatingDetectionStateEnum.Running;
    cheatingDetection.forbiddenCommandsState = CheatingDetectionStateEnum.Disabled;
    cheatingDetection.executedBy = '';
    cheatingDetection.trainingInstanceId = this.trainingInstanceId;
    return cheatingDetection;
  }
}
