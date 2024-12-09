import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kypo-floating-answer-form',
  templateUrl: './floating-answer-form.component.html',
  styleUrl: './floating-answer-form.component.css',
})
export class FloatingAnswerFormComponent implements OnChanges {
  @Input() placeholder: string = 'Answer';
  @Input() buttonLabel: string = 'Submit';

  @Output() onSubmit: EventEmitter<string> = new EventEmitter();

  answer: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.answer = '';
    }
  }

  /**
   * Calls service to check whether the answer is correct
   */
  submitAnswer(): void {
    this.onSubmit.emit(this.answer);
    this.scrollToTop();
  }

  /**
   * Checks whether user confirmed answer input with Enter
   * @param event keydown event
   */
  keyboardSubmitAnswer(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submitAnswer();
    }
  }

  private scrollToTop(): void {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }
}
