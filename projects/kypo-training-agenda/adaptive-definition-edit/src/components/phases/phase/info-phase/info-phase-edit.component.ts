import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { takeWhile } from 'rxjs/operators';
import { InfoPhaseEditFormGroup } from './info-phase-edit-form-group';
import { AbstractControl } from '@angular/forms';
import { InfoPhase } from '@muni-kypo-crp/training-model';

/**
 * Component for editing of new or existing info-phase-training-phase phases
 */
@Component({
  selector: 'kypo-info-phase-configuration',
  templateUrl: './info-phase-edit.component.html',
  styleUrls: ['./info-phase-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPhaseEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() phase: InfoPhase;
  @Output() phaseChange: EventEmitter<InfoPhase> = new EventEmitter();

  phaseConfigFormGroup: InfoPhaseEditFormGroup;

  get title(): AbstractControl {
    return this.phaseConfigFormGroup.formGroup.get('title');
  }
  get content(): AbstractControl {
    return this.phaseConfigFormGroup.formGroup.get('content');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('phase' in changes) {
      this.phaseConfigFormGroup = new InfoPhaseEditFormGroup(this.phase);
      this.phaseConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.phaseConfigFormGroup.setToPhase(this.phase);
        this.phaseChange.emit(this.phase);
      });
    }
  }
}
