import { Component, Input, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AbstractControl } from '@angular/forms';
import { CheatingDetectionEditFormGroup } from './cheating-detection-edit-form-group';
import { CheatingDetectionEditService } from '../services/cheating-detection-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CheatingDetectionEditComponent extends SentinelBaseDirective implements OnInit {
  @Input() trainingInstance$: Observable<TrainingInstance>;

  cheatingDetectionEditFormGroup: CheatingDetectionEditFormGroup;
  cheatingDetection: CheatingDetection;
  controls: SentinelControlItem[];
  trainingInstanceId: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: CheatingDetectionEditService
  ) {
    super();
  }

  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(take(1)).subscribe();
  }

  numericOnly(event): boolean {
    return !isNaN(Number(event.key)) && event.key !== ' ';
  }

  ngOnInit(): void {
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
  get timeThreshold(): AbstractControl {
    return this.cheatingDetectionEditFormGroup.formGroup.get('proximityThreshold');
  }

  initControls(editService: CheatingDetectionEditService): void {
    this.controls = [
      new SentinelControlItem(
        'create',
        'Create',
        'primary',
        of(!this.cheatingDetectionEditFormGroup.formGroup.valid),
        defer(() =>
          editService.create(this.cheatingDetectionEditFormGroup.createCheatingDetection(), this.trainingInstanceId)
        )
      ),
    ];
  }
}
