import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { SentinelBaseDirective } from '@sentinel/common';
import { Hint } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { HintEditFormGroup } from './hint-edit-form-group';

@Component({
  selector: 'kypo-hint-edit',
  templateUrl: './hint-detail-edit.component.html',
  styleUrls: ['./hint-detail-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component to edit new or existing training level hint
 */
export class HintDetailEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() hint: Hint;
  @Input() levelMaxScore: number;
  @Input() hintsPenaltySum: number;
  @Input() order: number;
  @Output() hintChange: EventEmitter<Hint> = new EventEmitter();

  maxHintPenalty: number;
  hintConfigurationFormGroup: HintEditFormGroup;

  constructor() {
    super();
  }

  get title(): AbstractControl {
    return this.hintConfigurationFormGroup.formGroup.get('title');
  }
  get content(): AbstractControl {
    return this.hintConfigurationFormGroup.formGroup.get('content');
  }
  get hintPenalty(): AbstractControl {
    return this.hintConfigurationFormGroup.formGroup.get('hintPenalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('hint' in changes) {
      this.hintConfigurationFormGroup = new HintEditFormGroup(this.hint);
      this.calculateMaxPenalty();
      this.subscribeFormChanges();
    }
    if ('hintsPenaltySum' in changes || 'levelMaxScore' in changes) {
      this.calculateMaxPenalty();
    }
  }

  /**
   * Changes internal component state and emits event on hint change
   */
  onHintChanged(): void {
    this.hintConfigurationFormGroup.formGroup.markAsDirty();
    this.hintConfigurationFormGroup.setToHint(this.hint);
    this.hintChange.emit(this.hint);
  }

  private subscribeFormChanges() {
    this.hintConfigurationFormGroup.formGroup.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.onHintChanged());
  }

  private calculateMaxPenalty() {
    this.maxHintPenalty = this.levelMaxScore - (this.hintsPenaltySum - this.hint.penalty);
    this.hintPenalty.setValidators([Validators.required, Validators.min(0), Validators.max(this.maxHintPenalty)]);
  }
}
