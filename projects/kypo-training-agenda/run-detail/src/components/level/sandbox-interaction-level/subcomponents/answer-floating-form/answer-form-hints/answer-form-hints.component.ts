import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HintButton } from '@cyberrangecz-platform/training-agenda/internal';
import { Hint } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-answer-form-hints',
  templateUrl: './answer-form-hints.component.html',
  styleUrl: './answer-form-hints.component.css',
})
export class AnswerFormHintsComponent {
  @Input({ required: true }) isSolutionRevealed$: Observable<boolean>;
  @Input({ required: true }) hintsButtons$: Observable<HintButton[]>;
  @Input({ required: true }) isLoading$: Observable<boolean>;

  @Output() hintRevealed: EventEmitter<Hint> = new EventEmitter();
  @Output() solutionRevealed: EventEmitter<void> = new EventEmitter();

  /**
   * Calls service to reveal hint
   * @param hintButton hint button clicked by the user
   */
  emitHintRevealed(hintButton: HintButton): void {
    this.hintRevealed.emit(hintButton.hint);
  }

  /**
   * Calls service to reveal solution
   */
  emitSolutionRevealed(): void {
    this.solutionRevealed.emit();
  }
}
