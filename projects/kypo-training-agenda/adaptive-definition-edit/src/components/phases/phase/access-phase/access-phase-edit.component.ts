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
import { AccessPhaseEditFormGroup } from './access-phase-edit-form-group';
import { AbstractControl } from '@angular/forms';
import { AccessPhase } from '@muni-kypo-crp/training-model';

/**
 * Component for editing of new or existing info-phase-training-phase phases
 */
@Component({
  selector: 'kypo-access-phase-configuration',
  templateUrl: './access-phase-edit.component.html',
  styleUrls: ['./access-phase-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessPhaseEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() phase: AccessPhase;
  @Output() phaseChange: EventEmitter<AccessPhase> = new EventEmitter();

  phaseConfigFormGroup: AccessPhaseEditFormGroup;

  get title(): AbstractControl {
    return this.phaseConfigFormGroup.formGroup.get('title');
  }
  get passkey(): AbstractControl {
    return this.phaseConfigFormGroup.formGroup.get('passkey');
  }
  get cloudContent(): AbstractControl {
    return this.phaseConfigFormGroup.formGroup.get('cloudContent');
  }
  get localContent(): AbstractControl {
    return this.phaseConfigFormGroup.formGroup.get('localContent');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('phase' in changes) {
      this.phaseConfigFormGroup = new AccessPhaseEditFormGroup(this.phase);
      this.phaseConfigFormGroup.formGroup.get('title').markAsTouched();
      this.phaseConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.phaseConfigFormGroup.setToPhase(this.phase);
        this.phaseChange.emit(this.phase);
      });
    }
  }
}
