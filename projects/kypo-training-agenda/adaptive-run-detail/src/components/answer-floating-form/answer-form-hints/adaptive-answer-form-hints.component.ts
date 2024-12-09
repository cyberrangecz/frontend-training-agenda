import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'kypo-adaptive-answer-form-hints',
  templateUrl: './adaptive-answer-form-hints.component.html',
  styleUrl: './adaptive-answer-form-hints.component.css',
})
export class AdaptiveAnswerFormHintsComponent {
  @Input({ required: true }) isSolutionRevealed$: Observable<boolean>;
  @Input({ required: true }) isLoading$: Observable<boolean>;

  @Output() solutionRevealed: EventEmitter<void> = new EventEmitter();

  /**
   * Calls service to reveal solution
   */
  emitSolutionRevealed(): void {
    this.solutionRevealed.emit();
  }
}
