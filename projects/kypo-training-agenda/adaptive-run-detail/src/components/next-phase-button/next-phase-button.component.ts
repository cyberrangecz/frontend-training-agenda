import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'kypo-next-phase-button',
  templateUrl: './next-phase-button.component.html',
  styleUrls: ['./next-phase-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextPhaseButtonComponent {
  @Input() isLast: boolean;
  @Input() isLoading: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  onNext(): void {
    this.next.emit();
  }
}
