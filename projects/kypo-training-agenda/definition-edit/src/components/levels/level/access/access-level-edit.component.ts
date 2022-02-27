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
import { AccessLevel, InfoLevel } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { AccessLevelEditFormGroup } from './access-level-edit-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for editing of new or existing info level
 */
@Component({
  selector: 'kypo-access-level-configuration',
  templateUrl: './access-level-edit.component.html',
  styleUrls: ['./access-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessLevelEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() level: AccessLevel;
  @Output() levelChange: EventEmitter<AccessLevel> = new EventEmitter();

  accessLevelConfigFormGroup: AccessLevelEditFormGroup;

  get title(): AbstractControl {
    return this.accessLevelConfigFormGroup.formGroup.get('title');
  }
  get passkey(): AbstractControl {
    return this.accessLevelConfigFormGroup.formGroup.get('passkey');
  }
  get cloudContent(): AbstractControl {
    return this.accessLevelConfigFormGroup.formGroup.get('cloudContent');
  }
  get localContent(): AbstractControl {
    return this.accessLevelConfigFormGroup.formGroup.get('localContent');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.accessLevelConfigFormGroup = new AccessLevelEditFormGroup(this.level);
      this.title.markAsTouched();
      this.accessLevelConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.accessLevelConfigFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
  }
}
