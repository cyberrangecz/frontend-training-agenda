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
import { GameLevel } from '@muni-kypo-crp/training-model';
import { Hint } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { GameLevelEditFormGroup } from './game-level-edit-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for editing new or existing game level
 */
@Component({
  selector: 'kypo-game-level-edit',
  templateUrl: './game-level-edit.component.html',
  styleUrls: ['./game-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLevelEditComponent extends SentinelBaseDirective implements OnChanges {
  @Input() level: GameLevel;
  @Output() levelChange: EventEmitter<GameLevel> = new EventEmitter();
  gameLevelConfigFormGroup: GameLevelEditFormGroup;

  get title(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('title');
  }
  get content(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('content');
  }
  get solution(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('solution');
  }
  get maxScore(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('maxScore');
  }
  get solutionPenalized(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('solutionPenalized');
  }
  get incorrectFlagLimit(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('incorrectFlagLimit');
  }
  get flag(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('flag');
  }
  get estimatedDuration(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('estimatedDuration');
  }
  get hints(): AbstractControl {
    return this.gameLevelConfigFormGroup.formGroup.get('hints');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.gameLevelConfigFormGroup = new GameLevelEditFormGroup(this.level);
      this.gameLevelConfigFormGroup.formGroup.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
        this.gameLevelConfigFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
  }

  /**
   * Sets changed hints to the current level and emits level change event
   * @param hints new state of hints associated with current level
   */
  hintsChanged(hints: Hint[]): void {
    this.level.hints = hints;
    this.gameLevelConfigFormGroup.setToLevel(this.level);
    this.levelChange.emit(this.level);
  }
}
