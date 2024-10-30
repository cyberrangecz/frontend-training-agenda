import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Component of training timer displaying time passed from start of the training
 */
@Component({
  selector: 'kypo-training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingTimerComponent implements OnChanges {
  @Input() startTime: Date;
  timeElapsed: Observable<number>;
  destroyRef = inject(DestroyRef);

  ngOnChanges(changes: SimpleChanges): void {
    if ('startTime' in changes) {
      this.startCounter();
    }
  }

  private startCounter() {
    const period = 1000;
    this.timeElapsed = timer(0, period).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => this.calculateElapsedTime()),
    );
  }

  private calculateElapsedTime(): number {
    return Date.now() - this.startTime.valueOf();
  }
}
