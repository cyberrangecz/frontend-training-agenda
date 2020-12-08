import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'kypo-next-level-button',
  templateUrl: './next-level-button.component.html',
  styleUrls: ['./next-level-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextLevelButtonComponent {
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  onNext(): void {
    this.next.emit();
  }
}
