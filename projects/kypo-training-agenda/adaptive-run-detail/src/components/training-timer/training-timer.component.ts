import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

/**
 * Component of training timer displaying time passed from start of the training
 */
@Component({
  selector: 'kypo-training-timer',
  templateUrl: './training-timer.component.html',
  styleUrls: ['./training-timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingTimerComponent extends SentinelBaseDirective implements OnChanges {
  @Input() startTime: Date;
  timeElapsed: Observable<number>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('startTime' in changes) {
      this.startCounter();
    }
  }

  private startCounter() {
    const period = 1000;
    this.timeElapsed = timer(0, period).pipe(
      takeWhile(() => this.isAlive),
      map(() => this.calculateElapsedTime())
    );
  }

  private calculateElapsedTime(): number {
    return Date.now() - this.startTime.valueOf();
  }
}
