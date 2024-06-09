import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractLevelTypeEnum, MitreTechnique } from '@muni-kypo-crp/training-model';
import { Level } from '@muni-kypo-crp/training-model';

/**
 * Main component of level edit. Resolves which component should be display based on level type
 */
@Component({
  selector: 'kypo-level-edit',
  templateUrl: './abstract-level-edit.component.html',
  styleUrls: ['./abstract-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractLevelEditComponent {
  @Input() level: Level;
  @Input() mitreTechniquesList: MitreTechnique[];
  @Output() levelChange: EventEmitter<Level> = new EventEmitter();
  levelTypes = AbstractLevelTypeEnum;

  /**
   * Passes emitted event to the parent component
   * @param level changed level
   */
  onLevelChange(level: Level): void {
    this.levelChange.emit(level);
  }
}
