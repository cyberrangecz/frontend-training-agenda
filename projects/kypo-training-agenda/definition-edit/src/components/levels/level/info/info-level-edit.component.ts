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
import { InfoLevel } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { InfoLevelEditFormGroup } from './info-level-edit-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for editing of new or existing info level
 */
@Component({
  selector: 'kypo-info-level-configuration',
  templateUrl: './info-level-edit.component.html',
  styleUrls: ['./info-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLevelEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() level: InfoLevel;
  @Output() levelChange: EventEmitter<InfoLevel> = new EventEmitter();

  infoLevelConfigFormGroup: InfoLevelEditFormGroup;

  get title(): AbstractControl {
    return this.infoLevelConfigFormGroup.formGroup.get('title');
  }
  get content(): AbstractControl {
    return this.infoLevelConfigFormGroup.formGroup.get('content');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.infoLevelConfigFormGroup = new InfoLevelEditFormGroup(this.level);
      this.infoLevelConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.infoLevelConfigFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
  }
}
