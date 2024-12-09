import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { InfoLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-level',
  templateUrl: './info-level.component.html',
  styleUrls: ['./info-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component to display training run's level of type INFO. Only displays markdown and allows user to continue immediately.
 */
export class InfoLevelComponent {
  @Input() level: InfoLevel;
  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  onNext(): void {
    this.next.emit();
  }
}
