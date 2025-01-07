import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractLevelTypeEnum } from '@muni-kypo-crp/training-model';
import { Level } from '@muni-kypo-crp/training-model';

/**
 * Component to display one level in a training run. Serves mainly as a wrapper which determines the type of the training
 * and displays child component accordingly
 */
@Component({
  selector: 'kypo-abstract-level',
  templateUrl: './abstract-level.component.html',
  styleUrls: ['./abstract-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractLevelComponent {
  @Input() level: Level;
  @Input() startTime: Date;
  @Input() isLast: boolean;
  @Input() isLevelAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;
  @Input() localEnvironment: boolean;

  @Output() next: EventEmitter<void> = new EventEmitter();
  levelTypes = AbstractLevelTypeEnum;

  onNext(): void {
    this.next.emit();
  }
}
